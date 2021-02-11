import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

function LikeButton({ post: {id, likeCount, likes}}){
const [liked, setLiked] = useState(false);
useEffect(() => {
    if(user && likes.find(like => like.username === user.username)){
setLiked(true)
} else setLiked(false)

}, [user, likes]);

return(
    <Button as="div" labelPosition="right" onClick={likePost}>
      
          <Label basic color="teal" pointing="left">
            {likeCount}
          </Label>
        </Button>

)
}

export default LikeButton