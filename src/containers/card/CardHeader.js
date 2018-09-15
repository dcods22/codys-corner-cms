import React from "react";
import styled from "styled-components";

const CardHeaderDiv = styled.div.attrs({
  className: "card-header"
})`
  &&& {
    background: ${props => props.theme.colors["white"]};
    color: ${props => props.theme.colors["cc-blue"]};
    border-bottom: 1px solid ${props => props.theme.colors["cc-blue"]};
    font-size: 1.2rem;
    @media (max-width: 767px) {
      padding: 0.45rem 8px;
    }
    @media (min-width: 768px) {
    }
  }
`;

class CardHeader extends React.Component {
  render() {
    return <CardHeaderDiv>{this.props.children}</CardHeaderDiv>;
  }
}

CardHeader.defaultProps = {
  key: "card-header"
};

export default CardHeader;
