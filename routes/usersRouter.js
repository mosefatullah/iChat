const express = require("express");
const router = express.Router();

const {
 getUsers,
 addUser,
 removeUser,
} = require("../controllers/usersController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
 addUserValidators,
 addUserValidationHandler,
} = require("../middlewares/users/userValidators");
const { checkLogin } = require("../middlewares/common/checkLogin");

router.get("/", decorateHtmlResponse("Users"), checkLogin, getUsers);
router.post(
 "/",
 checkLogin,
 avatarUpload,
 addUserValidators,
 addUserValidationHandler,
 addUser
);
router.delete("/:id", checkLogin, removeUser);

module.exports = router;
