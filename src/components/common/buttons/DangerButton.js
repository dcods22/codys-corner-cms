import React from "react";
import styled from "styled-components";

const DangerButtonStyled = styled.button.attrs({
  className: "btn btn-danger"
})``;

class DangerButton extends React.Component {
  render() {
    return <DangerButtonStyled {...this.props}>{this.props.children}</DangerButtonStyled>;
  }
}

export default DangerButton;
