import React from "react";
import Protected from "../components/security/Protected";

class ArticlesContainer extends React.Component {
  render() {
    return <div>articles</div>;
  }
}

export default Protected(ArticlesContainer);
