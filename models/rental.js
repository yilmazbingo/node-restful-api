const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { customerSchema } = require("./customer.js");

const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      },
      isGold: {
        type: Boolean,
        default: false
      },
      phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      }
    }),
    required: true
  },

  //I am not reusing "movieSchema" here, because I need only essential properties of it.
  book: {
    type: new mongoose.Schema({
      title: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true,
        trim: true
      },
      dailyRentalRate: {
        type: Number,
        minlength: 0,
        maxlength: 255,
        required: true
      }
    }),
    required: true
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now
  },
  dateReturned: {
    type: Date
  },
  rentalFee: {
    type: Number,
    min: 0
  }
});

const Rental = mongoose.model("Rental", rentalSchema);

function validateRental(rental) {
  const schema = Joi.object().keys({
    customerId: Joi.objectId().required(),
    bookId: Joi.objectId().required()
  });
  return Joi.validate(rental, schema);
}

module.exports.validate = validateRental;
module.exports.Rental = Rental;
