import React from "react";
import { inject, observer } from "mobx-react";

class ArticleEditHeader extends React.Component {
  render() {
    return <div>Edit Article</div>;
  }
}

export default inject("rootStore")(observer(ArticleEditHeader));
