const express = require("express");
const app = express();
const helmet = require("helmet");
const logger = require("../error/winston"); //logging our app
const morganLogStream = require("../error/morgan");

const morgan = require("morgan");
const genres = require("../routes/genres");
const customers = require("../routes/customers");
const books = require("../routes/books");
const rentals = require("../routes/rentals");
const users = require("../routes/users");
const auth = require("../routes/auth");
const cors = require("cors");
require("express-async-errors");
require("winston-mongodb");

app.use(express.json());
app.use(morgan("combined", { stream: morganLogStream }));
//'combined' standart apache log format
//will include remote ip address and user agent http request header
//stream will log morgan outputs into the file that we defined in require("../error/morgan")
app.use(cors());
app.use(helmet());
app.get("env");
app.use(logger);
app.use("/images", express.static("images"));
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/books", books);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

const port = process.env.PORT;
const server = app.listen(port, () => console.log(`listening on port ${port}`));

module.exports = app;
module.exports = server;
