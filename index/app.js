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
const dev = require("../config/develepmont");
const test = require("../config/test");

app.use(express.json());
//a middleware func. reads the request, if there is a JSON object in the body of the request, it will parse the body of the request into a JSON object and then it will set "request.body" property. finally it passes the control to another middleware function which is route handler.
app.use(morgan("combined", { stream: morganLogStream }));
//by default, it logs the request on the console
//'combined' standart apache log format
//will include remote ip address and user agent http request header
//stream will log morgan outputs into the file that we defined in require("../error/morgan")
app.use(cors());
app.use(helmet());
app.get("env");
app.use(logger); //logger returns a function
app.use("/images", express.static("images"));
app.use("/api/genres", genres); //anything starts with /api/genres will be forwarded to genres=require("./routes/genres");
app.use("/api/customers", customers);
app.use("/api/books", books);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

//these should be here otherwise server will not respond
const port = process.env.NODE_ENV === "test" ? 4000 : 3000;
const server = app.listen(port, () => console.log(`listening on port ${port}`));

module.exports = app;
module.exports = server;
