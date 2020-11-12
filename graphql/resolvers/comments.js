const { UserInputError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require("../../util/check-auth");

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context);
      // error message if someone posts an empty comment:
      if (body.trim() === "") {
        throw new UserInputError("Empty comment", {
          errors: {
            body: "Comment body must not be empty",
          },
        });
      }
      const post = await Post.findById(postId);

      if(post){
          //new post added at to the top of the array with unshift()
          post.comments.unshift({
              body,
              username,
              createdAt: new Date().toISOString()
          })
      }
    },
  },
};
