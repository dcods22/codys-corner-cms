import React from "react";
import { inject, observer } from "mobx-react";
import styled from "styled-components";
import CCLink from "../common/CCLink";
import NavItem from "./NavItem";
import NavUser from "./NavUser";

const Nav = styled.nav.attrs({
  className: "navbar navbar-expand-md"
})`
  &&& {
    background-color: ${props => props.theme.colors["cc-blue"]};
  }
`;

class Navbar extends React.Component {
  render() {
    const { authStore } = this.props.rootStore;
    return (
      <Nav>
        <CCLink className="navbar-brand" to="/home">
          Cody's Corner CMS
        </CCLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#ccNavContent"
          aria-controls="ccNavContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        {authStore.isLoggedIn ? (
          <div className="collapse navbar-collapse" id="ccNavContent">
            <ul className="navbar-nav mr-auto">
              <NavItem to="/articles">Articles</NavItem>
            </ul>
          </div>
        ) : null}
        <ul className="navbar-nav ml-auto">{authStore.isLoggedIn ? <NavUser /> : null}</ul>
      </Nav>
    );
  }
}

export default inject("rootStore")(observer(Navbar));
