/* jshint esversion:6 */

const mongoose = require("mongoose");
const test = require("../config/test");
const dev = require("../config/develepmont");
const app = require("./app");
//In JavaScript, functions are first-class citizens. Means that;
//You can assign a function to a variable and call it. you can also pass a function as a parameter (callback) and call it.

//(===) is strict equality. both values should have same value and same type
//(==)loose equality. doesnt care about type matching. it will convert the types

if (process.env.NODE_ENV === "test") {
  mongoose
    .connect(String(test.db), {
      useNewUrlParser: true
    })
    .catch(err => {
      console.log(err.stack);
      process.exit(1);
    })
    .then(() => {
      console.log(`connected to db in test environment`);
      // app.listen(port, () => console.log(`listening on port ${port}`));
    });
} else if ((process.env.NODE_ENV = "development")) {
  mongoose
    .connect(String(dev.db), { useNewUrlParser: true })
    .catch(err => {
      console.log(err.stack);
      process.exit(1);
    })
    .then(() => {
      console.log("connected to db in development environment");
      // app.listen(port, () => console.log(`listening on port ${port}`));
    });
}
// you can't use a variable with dot notation
