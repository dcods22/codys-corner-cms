import React from "react";
import CCLink from "../common/CCLink";

class NavItem extends React.Component {
  render() {
    return (
      <li className="nav-item">
        <CCLink to={this.props.to}>{this.props.children}</CCLink>
      </li>
    );
  }
}

export default NavItem;
