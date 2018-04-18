import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import "../style.css";
import "../Comment/style.css";
import "./style.css";

class AddComment extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      disabled: false
    };
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(ev) {
    this.setState({ comment: ev.target.value });
  }

  onKeyPress(ev) {
    if (ev.key === "Enter" && !ev.shiftKey) {
      this.setState({ disabled: true }, () => {
        this.props
          .onSendComment(this.props.author, this.state.comment)
          .then(({ data }) => {
            if (!data.errors) {
              this.setState({ comment: "", disabled: false });
              this.textarea.focus();
            } else {
              console.log(data.errors);
              this.setState({ disabled: false });
              this.textarea.focus();
              alert(data.errors.join("\n"));
            }
          })
          .catch(error => {
            console.log(error);
            this.setState({ disabled: false });
            this.textarea.focus();
            alert(error);
          });
      });
    }
  }

  render() {
    const { author } = this.props;
    const { comment, disabled } = this.state;
    return (
      <div className={classnames("d-flex flex-column", "topBox")}>
        <div
          className={classnames(
            "comment-wrapper",
            "right",
            "align-self-stretch"
          )}
        >
          <div className="username">{author}</div>
          <div>
            <textarea
              ref={c => {
                this.textarea = c;
              }}
              disabled={disabled}
              className="addcomment-textarea"
              onChange={this.onChange}
              onKeyPress={this.onKeyPress}
              rows={3}
              value={comment}
            />
          </div>
          <div className="hint">Press 'Enter' to send</div>
        </div>
      </div>
    );
  }
}

AddComment.propTypes = {
  author: PropTypes.string.isRequired,
  onSendComment: PropTypes.func.isRequired
};

export default AddComment;
