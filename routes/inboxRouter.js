const express = require("express");
const router = express.Router();

const { getInbox } = require("../controllers/inboxController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const { checkLogin } = require("../middlewares/common/checkLogin");
const { searchUser } = require("../controllers/inboxController");
const { addConversation } = require("../controllers/inboxController");
const { getMessages } = require("../controllers/inboxController");
const { sendMessage } = require("../controllers/inboxController");
const attachmentUpload = require("../middlewares/inbox/attachmentUpload");
const loadConversations = require("../middlewares/common/loadConversations");

router.get("/", decorateHtmlResponse("Inbox"), checkLogin, loadConversations, getInbox);
router.post("/search", checkLogin, searchUser);
router.post("/conversation", checkLogin, addConversation);
router.get("/messages/:conversation_id", checkLogin, getMessages);
router.post("/message", checkLogin, attachmentUpload, sendMessage);

module.exports = router;
