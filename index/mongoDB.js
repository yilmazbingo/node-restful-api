/* jshint esversion:6 */

const mongoose = require("mongoose");

// if (process.env.NODE_ENV === "test") {
//   mongoose
//     .connect(process.env.DB, {
//       useNewUrlParser: true
//     })
//     .catch(err => {
//       console.log(err.stack);
//       process.exit(1);
//     })
//     .then(() => {
//       console.log(`connected to db in test environment`);
//     });
// } else if ((process.env.NODE_ENV = "development")) {
//   mongoose
//     .connect(process.env.DB, { useNewUrlParser: true })
//     .catch(err => {
//       console.log(err.stack);
//       process.exit(1);
//     })
//     .then(() => {
//       console.log("connected to db in development environment");
//     });
// }

mongoose
  .connect(String(process.env.DB), {
    useNewUrlParser: true
  })
  .catch(err => {
    console.log("mongo server is not up");
    process.exit(1);
  })
  .then(() => {
    console.log(`connected to db in test environment`);
  });
