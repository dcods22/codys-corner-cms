import React from "react";
import { inject, observer } from "mobx-react";
import ArticleEditForm from "./ArticleEditForm";
import ArticleStatus from "../status/ArticleStatus";

class ArticleEditBody extends React.Component {
  render() {
    const { articleEditStore } = this.props.rootStore;
    return (
      <div>
        <ArticleStatus status={articleEditStore.currentArticleStatus} />
        <ArticleEditForm />
      </div>
    );
  }
}

export default inject("rootStore")(observer(ArticleEditBody));
