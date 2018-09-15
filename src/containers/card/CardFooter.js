import React from "react";
import styled from "styled-components";

const CardFooterDiv = styled.div.attrs({
  className: "card-header"
})`
  background: ${props => props.theme.colors["light-grey"]};
  border-top: 1px solid ${props => props.theme["grey"]};
`;

class CardFooter extends React.Component {
  render() {
    return <CardFooterDiv>{this.props.children}</CardFooterDiv>;
  }
}

CardFooter.defaultProps = {
  key: "card-footer"
};

export default CardFooter;
