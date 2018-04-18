import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import classnames from "classnames";
import TimeAgo from "react-timeago";
import "./style.css";
import "../style.css";

export const CommentPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired
});

class Comment extends React.PureComponent {
  render() {
    const { comment, myUsername } = this.props;
    const isright = myUsername === comment.author;
    const wrapperClass = classnames("comment-wrapper", {
      right: isright,
      left: !isright
    });
    return (
      <div className={wrapperClass}>
        <div>
          <span className="username">{comment.author}</span>
          <span className="comment-timestamp">
            <TimeAgo date={comment.timestamp} />
          </span>
        </div>
        <div>{comment.comment}</div>
      </div>
    );
  }
}

Comment.propTypes = {
  myUsername: PropTypes.string,
  comment: CommentPropType.isRequired
};

Comment.defaultProps = {
  myUsername: undefined
};

Comment.fragments = {
  comment: gql`
    fragment CommentDetails on Comment {
      id
      author
      timestamp
      comment
    }
  `
};

export default Comment;
