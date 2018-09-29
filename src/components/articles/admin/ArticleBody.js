import React from "react";
import ArticlesTable from "./ArticlesTable";
import { inject, observer } from "mobx-react";

class ArticleBody extends React.Component {
  render() {
    const { articleAdminStore } = this.props.rootStore;
    return (
      <div className="row">
        <div className="col-xs-12 col-md-6">
          <ArticlesTable data={articleAdminStore.mostRecentArticles} title="Most Recent Articles" />
        </div>
        <div className="mt-3 mt-md-0 col-xs-12 col-md-6">
          <ArticlesTable data={articleAdminStore.notPublishedArticles} title="Not Published Articles" />
        </div>
        <div className="mt-3 mt-md-0 col-xs-12 col-md-6">
          <ArticlesTable data={articleAdminStore.pendingApprovalArticles} title="Pending Approval Articles" />
        </div>
        <div className="mt-3 mt-md-0 col-xs-12 col-md-6">
          <ArticlesTable data={articleAdminStore.publishedArticles} title="Published Articles" />
        </div>
      </div>
    );
  }
}

export default inject("rootStore")(observer(ArticleBody));
