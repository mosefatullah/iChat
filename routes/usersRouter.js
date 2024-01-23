const express = require("express");
const router = express.Router();

const { getUsers } = require("../controllers/usersController");
const decorateHtmlResponse = require("../middlewares/decorateHtmlResponse");

router.get("/", decorateHtmlResponse("Users"), getUsers);

module.exports = router;
