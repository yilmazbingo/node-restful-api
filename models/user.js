const Joi = require("joi");
const mongoose = require("mongoose");
const validator = require("validator");
const config = require("../config/defaults");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true
  },
  email: {
    type: String,
    minlength: 10,
    maxlength: 255,
    //"unique" doesnt add any validation. when mongo searches for this email address, it will know that there is only one, so once it finds, it will stop searching.it is for optimizing the query
    unique: true,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: props => `${props.value} is not a valid email!`
    }
  },

  password: {
    type: String,
    minlength: 8,
    required: true,
    maxlength: 1024,
    // match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/,
    //this doesnt make sense
    //because we dont save plain passwords. we save them after we hash them.
    //so hashed password will match any combination of regex.
    //we have to implement this on client-side. check Joi validate func

    isAdmin: Boolean
  }
});
userSchema.methods.generateJwtToken = function() {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.jwtPrivateKey
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object().keys({
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    email: Joi.string()
      .min(8)
      .max(50)
      .required()
      .email(),
    password: Joi.string()
      .min(8)
      .required()
      .max(20)
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/) //special/number/capital
  });
  return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validate = validateUser;
