const express = require("express");
const router = express.Router();

const { getLogin, login, logout } = require("../controllers/loginController");
const {
 doLoginValidators,
 doLoginValidationHandler,
} = require("../middlewares/login/loginValidators");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const { redirectLoggedIn } = require("../middlewares/common/checkLogin");
const loadConversations = require("../middlewares/common/loadConversations");

const page_title = "Login";

router.get(
 "/",
 decorateHtmlResponse(page_title),
 redirectLoggedIn,
 loadConversations,
 getLogin
);
router.post(
 "/",
 decorateHtmlResponse(page_title),
 doLoginValidators,
 doLoginValidationHandler,
 login
);
router.delete("/logout", logout);

module.exports = router;
