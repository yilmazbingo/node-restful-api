const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
function validate(req) {
  const schema = Joi.object().keys({
    email: Joi.string()
      .min(8)
      .max(50)
      .email()
      .required(),
    password: Joi.string()
      .min(8)
      .max(20)
      .required()
  });
  return Joi.validate(req, schema); //Joi.validate(schema,req) will throw an error
}

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("invalid password or email"); //for the security purpose, dont send exact reason

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("invalid email or password");

  //we dont store the token in the database
  //therefore, session state is kept entirely on the client
  const token = user.generateJwtToken();
  res.send(token);
});

module.exports = router;
