const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;//this will get the token from the header
  if (authHeader) {
    const token = authHeader.split(" ")[1];//this will split the token
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");//this will return an error message if the token is not valid
      req.user = user;//this will set the user to the user from the token
      next();//this will move to the next middleware
    });
  } else {
    return res.status(401).json("You are not authenticated!");//this will return an error message if the user is not authenticated
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {//this will check if the user is the same as the user id or if the user is an admin
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {//this will check if the user is an admin
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};


module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};