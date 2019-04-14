/*jshint esversion:9 */
const mongoose = require("mongoose");
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  isGold: {
    type: Boolean,
    required: true
  },
  phone: {
    type: String,
    validate: {
      validator: function(v, callback) {
        setTimeout(function() {
          const phoneRegex = /\d{3}-\d{3}-\d{4}/;
          const msg = v + " is not a valid phone number!";

          callback(phoneRegex.test(v), msg);
        }, 5);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, "User phone number required"]
  }
});

const Customer = mongoose.model("Customer", customerSchema);

function validateCustomer(customer) {
  const schema = Joi.object().keys({
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    isGold: Joi.boolean().required(),
    phone: Joi.string()
      .trim()

      .required()
  });

  return Joi.validate(customer, schema);
}

module.exports.validate = validateCustomer;
module.exports.Customer = Customer;
module.exports.customerSchema = customerSchema;
