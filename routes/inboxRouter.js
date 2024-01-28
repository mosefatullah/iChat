const express = require("express");
const router = express.Router();

const { getInbox } = require("../controllers/inboxController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

router.get("/", decorateHtmlResponse("Inbox"), getInbox);

module.exports = router;
