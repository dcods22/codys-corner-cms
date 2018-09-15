import React from "react";
import PropTypes from "prop-types";

class BadgeButton extends React.Component {
  render() {
    return (
      <button
        type="button"
        className={"btn " + (this.props.active ? "btn-primary" : "btn-light")}
        onClick={this.props.onClick}
      >
        {this.props.title} <span className="badge badge-light">{this.props.count}</span>
      </button>
    );
  }
}

BadgeButton.propTypes = {
  active: PropTypes.bool.required,
  onClick: PropTypes.func.required,
  title: PropTypes.string.required
};

export default BadgeButton;
