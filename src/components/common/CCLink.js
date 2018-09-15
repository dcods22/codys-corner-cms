import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  &&& {
    color: ${props => props.theme.colors["almost-white"]};
    &:hover {
      color: ${props => props.theme.colors["light-grey"]};
    }
  }
`;

class CCLink extends React.Component {
  render() {
    return <StyledLink {...this.props} />;
  }
}

export default CCLink;
