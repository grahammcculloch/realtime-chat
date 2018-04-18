import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Comment from "../Comment";

const createCommentMutation = gql`
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      ...CommentDetails
    }
  }
  ${Comment.fragments.comment}
`;

const createCommentOptions = {
  props: ({ mutate }) => ({
    onSendComment: (author, comment) =>
      mutate({ variables: { input: { author, comment } } })
  })
};

export default graphql(createCommentMutation, createCommentOptions);
