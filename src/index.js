const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const { MY_SECRET_KEY } = require("./config/jwt.js");
const { PORT } = require("./config/express.js");
const authorizationMiddleware = require("./middlewares.js");

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello!");
});

app.post("/login", (req, res) => {
  const body = req.body;
  const username = body.username;
  const password = body.password;

  if (findUser(username, password)) {
    const token = jwt.sign({}, MY_SECRET_KEY);
    res.send({ token });
  } else res.status(401).send({ token: null });
});

app.get("/hello/:name?", authorizationMiddleware, (req, res) => {
  if (!req.params.name) return res.send("Hello!");

  const msg = `Hello ${req.params.name}`;
  res.send(msg);
});

// Running server
app.listen(PORT, () => {
  console.log("Runs on ", PORT);
});
