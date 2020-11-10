const Post = require("../../models/Post");
const checkAuth = require("../../util/check-auth");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          console.log(post);
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error("Post not found");
      }
    },
  },
  Mutation: {
    // context makes sure that the user is authentificated, token in header, defined it in index.js, Apolloserver
    async createPost(_, { body }, context) {
      const user = checkAuth(context);
      console.log(user);
      //the following block of code is executed when the user os authentificated, now he can create posts
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();

      return post;
    },
  },
};
