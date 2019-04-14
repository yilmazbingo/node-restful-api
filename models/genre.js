const Joi = require("joi");
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  }
});

const Genre = mongoose.model("Genre", genreSchema);

function validateGenre(genre) {
  const schema = Joi.string()
    .min(3)
    .max(50)
    .required();
  return Joi.validate(genre, schema);
}

(module.exports.validate = validateGenre),
  (module.exports.Genre = Genre),
  (module.exports.genreSchema = genreSchema);
