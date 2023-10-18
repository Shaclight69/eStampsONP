const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

app.use(cors());

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}
// dotenv.config({ path: "backend/config/config.env" });

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//Route imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute.js");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");
const event = require("./routes/eventRoute");

app.use("/api/v3", product);
app.use("/api/v3", user);
app.use("/api/v3", order);
app.use("/api/v3", payment);
app.use("/api/v3", event);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
