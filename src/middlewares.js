const jwt = require("jsonwebtoken");
const { MY_SECRET_KEY } = require("./config/jwt.js");

const authorizationMiddleware = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (authorization) {
    try {
      const isValid = await jwt.verify(
        authorization.replace("Bearer ", ""),
        MY_SECRET_KEY
      );
      next();
    } catch (e) {
      res.send({
        error: "Invalid token",
      });
    }
  }
};

module.exports = authorizationMiddleware;
