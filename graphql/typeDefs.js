const {gql} = require('apollo-server');

//! on line 11 after ID means it is required//

module.exports = gql`
  
  type Post{
    id:ID! 
    body: String!
    createdAt: String!
    username: String!
  }
  type Query {
    getPosts: [Post]
  }
`;

