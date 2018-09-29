import React from "react";
import styled from "styled-components";

const InfoButtonStyled = styled.button.attrs({
  className: "btn btn-info"
})``;

class InfoButton extends React.Component {
  render() {
    return <InfoButtonStyled {...this.props}>{this.props.children}</InfoButtonStyled>;
  }
}

export default InfoButton;
