import React from "react";
import { inject, observer } from "mobx-react";
import styled from "styled-components";

const LogoutLi = styled.li.attrs({
  className: "nav-item dropdown"
})`
  &&& {
    &:hover {
      cursor: pointer;
    }
  }
`;

const Logout = styled.a.attrs({
  href: "#",
  role: "button",
  className: "dropdown-toggle",
  id: "dropdownMenuLink",
  "data-toggle": "dropdown",
  "aria-haspopup": "true",
  "aria-expanded": "true"
})`
  &&& {
    color: ${props => props.theme.colors["almost-white"]};
    &:hover {
      color: ${props => props.theme.colors["light-grey"]};
    }
  }
`;

const NavDropdown = styled.div.attrs({
  className: "dropdown-menu dropdown-menu-left",
  "aria-labelledby": "dropdownMenuLink"
})`
  &&& {
    background-color: ${props => props.theme.colors["cc-blue"]};
  }
`;

const NavDropdownItem = styled.a.attrs({
  className: "dropdown-item"
})`
  &&& {
    color: ${props => props.theme.colors["almost-white"]};
    &:hover {
      cursor: pointer;
      background-color: ${props => props.theme.colors["cc-blue"]};
      color: ${props => props.theme.colors["light-grey"]};
    }
  }
`;

class NavUser extends React.Component {
  render() {
    const { authStore } = this.props.rootStore;

    return (
      <LogoutLi>
        <Logout>
          <i className="fa fa-user" />
          &nbsp;Dan Cody
        </Logout>
        <NavDropdown>
          <NavDropdownItem onClick={authStore.logout}>Logout</NavDropdownItem>
        </NavDropdown>
      </LogoutLi>
    );
  }
}

export default inject("rootStore")(observer(NavUser));
