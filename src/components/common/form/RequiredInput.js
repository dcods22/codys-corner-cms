import React from "react";
import PropTypes from "prop-types";
import ComptixLabel from "./ComptixLabel";

class RequiredInput extends React.Component {
  static defaultProps = {
    name: "",
    requiredText: null,
    label: "",
    children: { props: {} },
    validateFunc: value => {
      if (!value) {
        return false;
      } else {
        if (typeof value === typeof "") {
          return value.trim();
        } else if (typeof value === typeof -1) {
          //default value for not set
          return value !== -1;
        } else {
          return true;
        }
      }
    }
  };

  checkRequired(input, validateFunc) {
    const props = Object.assign({}, input.props);
    let className = !!input.props.className ? input.props.className : "";
    if (!input.props.value || !validateFunc(input.props.value)) {
      className += " is-invalid";
      props.required = true;
    }
    props.className = className;
    return React.cloneElement(input, props);
  }

  render() {
    return (
      <div>
        <ComptixLabel for={this.props.name} required={true}>
          {this.props.label}
        </ComptixLabel>
        {React.Children.map(this.props.children, child => this.checkRequired(child, this.props.validateFunc))}
        {this.props.requiredText ? <div className="invalid-feedback">{this.props.requiredText}</div> : null}
      </div>
    );
  }
}

RequiredInput.propTypes = {
  name: PropTypes.string.isRequired,
  requiredText: PropTypes.string,
  label: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
  validateFunc: PropTypes.func
};

export default RequiredInput;
