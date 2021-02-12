import { SingleFieldSubscriptionsRule } from "graphql";
import React from "react";
import gql from "graphql-tag";

function SinglePost(props) {
  const postId = props.match.params.postid;
}

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPosts(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default SinglePost;
