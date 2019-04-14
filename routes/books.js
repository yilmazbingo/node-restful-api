const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Book, validate } = require("../models/book");
const { Genre } = require("../models/genre");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "images");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
const imageFilter = function(req, file, cb) {
  // accept only matched images
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("jpg-jpeg-png-gif image files are allowed!"), false);
  }
  cb(null, true);
};
const upload = multer({
  fileFilter: imageFilter,
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }
});

//by default, "images" folder is not publicly accessible
//upload is a middleware func

router.get("/", async (req, res) => {
  const books = await Book.find().sort("");
  res.send(books);
});

router.get("/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).send("Wrong id! check your id number...");
  res.send(book);
});

router.post("/", upload.single("bookImag"), async (req, res) => {
  //Make sure the name "bookImage" is the same as the field name in the postman for image key value pairs.
  //multer also reads all req.body properties
  console.log(req.file); //req.file is awailable by upload.single() middleware func
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(404).send("Invalid genre id!!!");

  let book = new Book({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
    image: req.file.path
  });

  book = await book.save();
  res.send(book);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) res.status(404).send("Invalid genre id!!!");

  let book = await Book.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    },
    { new: true }
  );
  book = await book.save();
  res.send(book);
});

router.delete("/:id", async (req, res) => {
  const book = await Book.findOneAndDelete(req.params.id);
  if (!book) return res.status(400).send(error.details[0].message);
  res.send(book);
});

module.exports = router;
