const express = require("express");
const router = express.Router();

const { getInbox } = require("../controllers/inboxController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const { checkLogin } = require("../middlewares/common/checkLogin");

router.get("/", decorateHtmlResponse("Inbox"), checkLogin, getInbox);

module.exports = router;
