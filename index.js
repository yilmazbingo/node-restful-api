/*jshint esversion:9 */

require("./index/app");
require("./index/mongoDB");
require("loud-rejection/register");
require("env-cmd");

console.log(process.env.JWT_PRIVATE_KEY);

if (!process.env.JWT_PRIVATE_KEY) {
  console.log("Error:jwtPrivateKey is not defined");
  process.exit(1);
}
