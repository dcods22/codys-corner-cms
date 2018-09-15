import React from "react";
import styled from "styled-components";
import Select from "react-select";
import { ThemeConstants } from "../../../constants/ThemeConstants";

const StyledSelect = styled(Select)`
  &&& {
    div {
      ${props => (props.invalid ? "border-color: red" : "")};
    }
  }
`;

const Styles = {
  control: styles => ({
    ...styles,
    minWidth: 100
  }),
  placeholder: styles => ({
    ...styles,
    fontStyle: "italic",
    fontColor: ThemeConstants["light-grey"]
  })
};

class ComptixSelect extends React.Component {
  static defaultProps = {
    clearable: false,
    backspaceRemoves: false,
    deleteRemoves: false
  };

  render() {
    let invalid = this.props.className.includes("is-invalid");
    return <StyledSelect styles={Styles} {...this.props} invalid={invalid} />;
  }
}

ComptixSelect.defaultProps = {
  className: ""
};

export default ComptixSelect;
