import React from "react";
import styled from "styled-components";

const HeadingStyled = styled.div.attrs({
  className: "my-2"
})`
  font-weight: bold;
  font-size: 1.2rem;
`;

class Heading extends React.Component {
  render() {
    return <HeadingStyled>{this.props.children}</HeadingStyled>;
  }
}

export default Heading;
