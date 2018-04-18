import React from "react";
import PropTypes from "prop-types";
import FlipMove from "react-flip-move";
import sortBy from "lodash/sortBy";
import reverse from "lodash/reverse";
import Comment, { CommentPropType } from "../Comment";
import { CognitoAuthDataPropType } from "../propTypes";
import "./style.css";

const sortByTimestamp = (commentA, commentB) => {
  const a = new Date(commentA.timestamp);
  const b = new Date(commentB.timestamp);
  return a > b ? -1 : a < b ? 1 : 0;
};

class CommentList extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // Start listening for new comments
    this.unsubscribe = this.props.subscribeToNewComments();
  }

  componentWillUnmount() {
    // Stop listening for new comments
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    const { networkStatus, error, comments, authData } = this.props;
    if (error) {
      console.log(error);
      return (
        <div className="altContainer">
          <i className="fa fa-exclamation-triangle" />&nbsp;Failed to load
          comments
        </div>
      );
    }
    if (!comments && networkStatus === 1) {
      return (
        <div className="altContainer">
          <i className="fa fa-spinner fa-spin" />&nbsp;Loading comments...
        </div>
      );
    }
    const sortedComments = reverse(sortBy(comments.items, ["timestamp"]));
    return (
      <FlipMove
        className="flipContainer"
        duration={500}
        enterAnimation="accordionVertical"
        leaveAnimation="accordionVertical"
      >
        {sortedComments.map(comment => (
          <Comment
            key={comment.id}
            comment={comment}
            myUsername={authData.username}
          />
        ))}
      </FlipMove>
    );
  }
}

CommentList.propTypes = {
  authData: CognitoAuthDataPropType.isRequired,
  networkStatus: PropTypes.number.isRequired,
  error: PropTypes.instanceOf(Error),
  comments: PropTypes.shape({
    items: PropTypes.arrayOf(CommentPropType)
  }),
  subscribeToNewComments: PropTypes.func.isRequired
};

CommentList.defaultProps = {
  error: undefined,
  comments: undefined
};

export default CommentList;
