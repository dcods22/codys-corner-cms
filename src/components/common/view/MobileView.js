import React from "react";
import MediaQuery from "react-responsive";

class MobileView extends React.Component {
  render() {
    return <MediaQuery query="(max-width: 767px)">{this.props.children}</MediaQuery>;
  }
}

export default MobileView;
