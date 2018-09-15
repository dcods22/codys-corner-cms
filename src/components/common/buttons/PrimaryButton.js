import React from "react";
import styled from "styled-components";

const PrimaryButtonStyled = styled.button.attrs({
  className: "btn btn-primary"
})`
  &&& {
    background-color: ${props => props.theme.colors.navigation};
  }
`;

class PrimaryButton extends React.Component {
  render() {
    return <PrimaryButtonStyled {...this.props}>{this.props.children}</PrimaryButtonStyled>;
  }
}

export default PrimaryButton;
