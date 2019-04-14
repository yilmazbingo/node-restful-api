const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { genreSchema } = require("../models/genre");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 3,
    maxlength: 250,
    required: true,
    trim: true
  },
  genre: {
    type: genreSchema,
    required: true
  },
  numberInStock: {
    type: Number,
    min: 0,
    max: 255,
    required: true
  },
  dailyRentalRate: {
    type: Number,
    min: 0,
    max: 255,
    required: true
  },
  image: String
});

const Book = mongoose.model("Book", bookSchema);

function validateBook(book) {
  //Joi schema is what client sends us. so we need "genreId" in order to find the genre inside the database and then embed it inside the book document.
  const schema = Joi.object().keys({
    title: Joi.string()
      .min(3)
      .max(255)
      .required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number()
      .min(0)
      .max(255)
      .required(true),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(255)
      .required(),
    image: Joi.string()
  });
  return Joi.validate(book, schema);
}

exports.Book = Book;
exports.validate = validateBook;
