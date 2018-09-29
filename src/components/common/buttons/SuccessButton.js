import React from "react";
import styled from "styled-components";

const SuccessButtonStyled = styled.button.attrs({
  className: "btn btn-success"
})``;

class SuccessButton extends React.Component {
  render() {
    return <SuccessButtonStyled {...this.props}>{this.props.children}</SuccessButtonStyled>;
  }
}

export default SuccessButton;
