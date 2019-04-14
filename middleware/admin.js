//admin middleware func will be executed before authorizetion middleware func
//authorization middleware func will pass "req.user" to admin middleware func

module.exports = function(req, res, next) {
  if (!req.user.isAdmin) return res.status(403).send("Access denied");
  next(); //passes control to route handler
};

//401 code is unauthorized. but we still let client to send a different token
//403 code is forbidden. it means there is no access no matter what..
