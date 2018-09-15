import React from "react";
import Protected from "../components/security/Protected";

class HomeContainer extends React.Component {
  render() {
    return <div>home</div>;
  }
}

export default Protected(HomeContainer);
