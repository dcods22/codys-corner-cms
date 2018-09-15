import React from "react";
import styled from "styled-components";

const Card = styled.div.attrs({
  className: "card"
})`
  border: 1px solid ${props => props.theme.colors["medium-grey"]};
`;

class CardContainer extends React.Component {
  getComponent(key) {
    return this.props.children.filter(comp => {
      return comp.props.key === key;
    });
  }

  render() {
    return (
      <Card {...this.props}>
        {this.getComponent("card-header")}
        {this.getComponent("card-body")}
        {this.getComponent("card-footer")}
      </Card>
    );
  }
}

export default CardContainer;
