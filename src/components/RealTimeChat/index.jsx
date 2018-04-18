import React from "react";
import PropTypes from "prop-types";
// import Login from "../Login";
import AddComment from "../AddComment";
import { CognitoAuthDataPropType } from "../propTypes";
import CommentList from "../CommentList";
import "./style.css";

/**
 * Top-level component, wrapping the sub-components.
 */
class RealTimeChat extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { authData } = this.props;
    return (
      <div className="wrapper">
        <h1 className="title">GraphQL Chat</h1>
        <AddComment author={authData.username} />
        <CommentList authData={authData} />
      </div>
    );
  }
}

RealTimeChat.propTypes = {
  authData: CognitoAuthDataPropType.isRequired
};

export default RealTimeChat;
