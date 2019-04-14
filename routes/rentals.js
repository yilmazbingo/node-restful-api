const express = require("express");
const router = express.Router();
const { Rental, validate } = require("../models/rental");
const mongoose = require("mongoose");
const { Book } = require("../models/book");
const { Customer } = require("../models/customer");

router.get("/", async (req, res) => {
  const rental = await Rental.find().sort("-dateOut");
  res.send(rental);
});

router.get("/:id", async (req, res) => {
  const rental = await Rental.findById(req.params.id);
  if (!rental) return res.status(404).send("Invalid id!!!");
  res.send(rental);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const book = await Book.findById(req.body.bookId);
  if (!book) return res.status(400).send("Invalid book Id!!!");
  if (book.numberInStock === 0)
    return res.status(404).send("Book is not in stock");

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(404).send("Invalid customer id!!!");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    book: {
      _id: book._id,
      title: book.title,
      dailyRentalRate: book.dailyRentalRate
    }
    //"dateOut"property is defined to have default value in rentalSchema. So when we save this, Mongoose will automatically set this property.
  });
  rental = await rental.save();
  book.numberInStock--;
  book.save();
  res.send(rental);
});

module.exports = router;
