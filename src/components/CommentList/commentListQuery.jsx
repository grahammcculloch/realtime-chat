import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Comment from "../Comment";

const allCommentsQuery = gql`
  query AllComments {
    listComments {
      items {
        ...CommentDetails
      }
    }
  }
  ${Comment.fragments.comment}
`;

const commentsSubscription = gql`
  subscription SubscribeToNewComments {
    onCreateComment {
      ...CommentDetails
    }
  }
  ${Comment.fragments.comment}
`;

const allCommentsOptions = {
  options: {
    fetchPolicy: "cache-and-network"
  },
  props: ({
    data: { networkStatus, error, listComments, subscribeToMore },
    ...props
  }) => ({
    networkStatus,
    error,
    comments: listComments,
    ...props,
    subscribeToNewComments: params => {
      return subscribeToMore({
        document: commentsSubscription,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) {
            return prev;
          }

          const newComment = subscriptionData.data.onCreateComment;

          // Update the Apollo cache with the newly created comment
          return Object.assign({}, prev, {
            listComments: {
              ...prev.listComments,
              items: [newComment, ...prev.listComments.items]
            }
          });
        }
      });
    }
  })
};

export default graphql(allCommentsQuery, allCommentsOptions);
