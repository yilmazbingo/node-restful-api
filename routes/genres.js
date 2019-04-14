/* jshint esversion:9 */
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Genre, validate } = require("../models/genre");
const auth = require("../middleware/authorization");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/objectIdValidation");

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});
router.get("/:id", validateObjectId, async (req, res) => {
  // if (!mongoose.Types.ObjectId.isValid(req.params.id))
  //   return res.status(404).send("invalid id");
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send("Wrong id! Check your id number");
  res.send(genre);
});
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body.name);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({
    name: req.body.name
  });
  genre = await genre.save();
  res.send(genre);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body.name);
  if (error) return res.status(400).send(error.deytails[0].message);
  const genre = await Genre.findByIdAndDelete(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre) return res.status(404).send("Wrong id! Check your id number");
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre) return res.status(404).send("Wrong id! Check your id number");
  res.send(genre);
});

module.exports = router; //we r exporting the "router"
