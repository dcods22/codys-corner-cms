import React from "react";
import styled from "styled-components";

const CardBodyDiv = styled.div.attrs({
  className: "card-body"
})`
  &&& {
    background: ${props => props.theme.colors["light-grey2"]};
    @media (max-width: 767px) {
      padding: 0.45rem;
    }

    padding-top: 0.45rem;
  }
`;
class CardBody extends React.Component {
  render() {
    return <CardBodyDiv>{this.props.children}</CardBodyDiv>;
  }
}

CardBody.defaultProps = {
  key: "card-body"
};

export default CardBody;
