const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const createError = require("http-errors");

const { Pool } = require("pg");
const pool = new Pool({
  connection: process.env.DATABASE_URL,
  // ssl: true
  ssl: {
    rejectUnauthorized: false,
  },
});

const userRouter = require("./routes/users");
const blogRouter = require("./routes/blogs");
const likeDislikeRouter = require("./routes/likeDislike");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(userRouter);
app.use(blogRouter);
app.use(likeDislikeRouter);

// error
app.use(function (req, res, next) {
  if (!req.user) return next(createError(401, "Please login!"));
  next();
});

// PORT
const PORT = process.env.PORT || 2023;

// the PORT listener
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} PORT`);
});
