const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
const noteRoute = require("./routes/noteRoute");
var cookieParser = require("cookie-parser");
require("dotenv").config();

const port = process.env.PORT || 4000;

const app = express();
app.use(cookieParser());

app.use(express.json());

app.use("/user", userRoute);
app.use("/note", noteRoute);

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
}

app.listen(port, () => console.log("app is running"));
