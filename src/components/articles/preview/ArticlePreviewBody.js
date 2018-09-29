import React from "react";
import { inject, observer } from "mobx-react";
import ArticleStatus from "../status/ArticleStatus";
import ArticlePreview from "./ArticlePreview";
import ArticleStatusChangingButtons from "../status/ArticleStatusChangingButtons";

class ArticlePreviewBody extends React.Component {
  render() {
    const { articlePreviewStore } = this.props.rootStore;
    return (
      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col">
              <div className="d-flex align-items-center">
                <ArticleStatus status={articlePreviewStore.currentArticleStatus} />
                <ArticleStatusChangingButtons className={"ml-3"} />
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col">
              <ArticlePreview article={articlePreviewStore.article} tags={articlePreviewStore.tags} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default inject("rootStore")(observer(ArticlePreviewBody));
