import { SingleFieldSubscriptionsRule } from "graphql";
import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_POSTS_QUERY } from "../util/graphql";
import { Loader } from "semantic-ui-react";

function SinglePost(props) {
  const postId = props.match.params.postid;
  console.log(postId);
  const {
    data: { getPost },
  } = useQuery(FETCH_POSTS_QUERY, {
    variables: {
      postId,
    },
  });

  let postMarkup;
  if (!getPost) {
    postMarkup = (
      <div class="ui segment">
        <div class="ui active inverted dimmer">
          <div class="ui text loader">Loading post...</div>
        </div>
        <p></p>
      </div>
    );
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      likes,
      likeCount,
      commentCount,
    } = getPost;

    postMarkup = {
        <Grid>
        
        </Grid>
    }

  }
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
