/*jshint esversion:9 */

// If your application is to be used in other applications name it index.js
// If your application is NOT to be used in other applications name it server.js

//In Node.js, design must be simple, both in implementation and interface
// The modularity of Node.js heavily encourages the adoption of the Single Responsibility Principle (SRP): every module should have responsibility over a single functionality and that responsibility should be entirely encapsulated by the module.
// Having smaller and more focused modules empowers everyone to share or reuse even the smallest piece of code; it's the Don't Repeat Yourself (DRY) principle applied to a whole new level.s

require("./index/app");
require("./index/mongoDB");
require("loud-rejection/register"); //handles unhandled promise rejections
const config = require("./config/defaults");

if (!config.jwtPrivateKey) {
  console.log("Error:jwtPrivateKey is not defined");
  process.exit(1);
}
