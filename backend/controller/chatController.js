const Comment = require("../model/comments");
const User = require("../model/aut");

exports.postComment = async (req, res, next) => {
  try {
    const { text } = req.body;
    const userComment = new Comment({ text: text, sender: req.userId });
    await userComment.save();
    const user = await User.findById(req.userId);
    user.comments.push(userComment);
    await user.save();
    res.status(200).json({
      message: "comment successfully",
      comments: userComment.comment,
      commentId: userComment._id,
      userid: user._id,
    });
  } catch (err) {
    console.log(err);
  }
};
