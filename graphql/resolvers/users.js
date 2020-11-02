const User = require("../../models/User");

module.exports = {
  Mutation: {
    ///args is registerInput from typeDefs, type Mutation, register()
    register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      // TODO: valodate user data
      //TODO: Male sur user doesnt already exist
      //TODO: hash password and create an auth token
    },
  },
};
