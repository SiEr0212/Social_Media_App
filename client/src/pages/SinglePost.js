import React, { useContext } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_POSTS_QUERY } from "../util/graphql";
import { Card, Grid, Icon, Label, Image, Button  } from "semantic-ui-react";
import moment from "moment";
import LikeButton from "../components/LikeButton";

import { AuthContext } from "../context/auth";

function SinglePost(props) {
  const postId = props.match.params.postid;
  const { user } = useContext(AuthContext);
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

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              size="small"
              float="right"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }}/>
                <Button 
                as="div"
                labelPosition="right"
                onClick={() => console.log('Comment on post')}
                >
                    <Button basic color='blue'>
                        <Icon name="comments"/>
                    </Button>
                    <Label basic color="blue" pointing="left">
                        {commentCount}
                    </Label>
                </Button>

              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
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
