import React from "react";
import styled from "styled-components";

const LightButtonStyled = styled.button.attrs({
  className: "btn btn-light"
})`
  &&& {
    background-color: ${props => props.theme.ccNavContenttion};
  }
`;

class LightButton extends React.Component {
  render() {
    return <LightButtonStyled {...this.props}>{this.props.children}</LightButtonStyled>;
  }
}

export default LightButton;
