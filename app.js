const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const moment = require("moment");

const {
 notFoundHandler,
 errorHandler,
} = require("./middlewares/common/errorHandler");

const app = express();
const server = http.createServer(app);
dotenv.config();

const io = require("socket.io")(server);
global.io = io;

app.locals.moment = moment;

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

server.listen(process.env.PORT, () =>
 console.log("[] Server is running on port " + process.env.PORT)
);
