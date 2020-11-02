const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = require('../../config.js');
const User = require("../../models/User");

module.exports = {
  Mutation: {
    ///args is registerInput from typeDefs, type Mutation, register()
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      // TODO: valodate user data
      //TODO: Male sur user doesnt already exist
      //TODO: hash password and create an auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        passsword,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = jwt.sign({
          id: res.id,
          email: res.email,
          username: res.username
      }, SECRET_KEY, {expiresIn: '1h'});

      return {
          ...res._doc,
          id: res._id,
          token
      }
    },
  },
};
