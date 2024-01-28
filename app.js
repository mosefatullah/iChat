const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");

const { notFoundHandler, errorHandler } = require("./middlewares/common/errorHandler");

const app = express();
dotenv.config();

// Connect to DB
mongoose
 .connect(process.env.MONGO_CONNECTION_STRING)
 .then(() => console.log("Connected to MongoDB"))
 .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser(process.env.COOKIE_SECRET));

// Routes
app.use("/", require("./routes/loginRouter"));
app.use("/users", require("./routes/usersRouter"));
app.use("/inbox", require("./routes/inboxRouter"));

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(process.env.PORT, () =>
 console.log("[] Server is running on port " + process.env.PORT)
);
