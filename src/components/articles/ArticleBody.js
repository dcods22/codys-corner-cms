import React from "react";

class ArticleBody extends React.Component {
  render() {
    return (
      <div className="d-flex flex-wrap">
        <div>Most Recent Articles</div>
        <div>Not Published Articles</div>
      </div>
    );
  }
}

export default ArticleBody;
