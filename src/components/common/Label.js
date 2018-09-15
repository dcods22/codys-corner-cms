import React from "react";
import styled from "styled-components";

const StyledLabel = styled.label`
  font-weight: bold;
  font-size: 1rem;
`;

class Label extends React.Component {
  render() {
    return <StyledLabel {...this.props}>{this.props.children}</StyledLabel>;
  }
}

export default Label;
