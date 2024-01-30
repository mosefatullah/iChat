const Conversation = require("../../models/Conversation");

const loadConversations = async (req, res, next) => {
 try {
  if (req.user) {
   const conversations = await Conversation.find({
    $or: [
     { "creator.id": req.user.userid },
     { "participant.id": req.user.userid },
    ],
   });
   res.locals.data = conversations;
  }
  next();
 } catch (err) {
  next(err);
 }
};

module.exports = loadConversations;
