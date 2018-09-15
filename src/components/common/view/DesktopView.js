import React from "react";
import MediaQuery from "react-responsive";

class DesktopView extends React.Component {
  render() {
    return <MediaQuery query="(min-width: 768px)">{this.props.children}</MediaQuery>;
  }
}

export default DesktopView;
