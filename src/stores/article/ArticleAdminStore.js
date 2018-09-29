import { extendObservable, action, autorun, decorate, computed } from "mobx";

class ArticleAdminStore {
  constructor(routerStore, cmsApi) {
    this.routerStore = routerStore;
    this.cmsApi = cmsApi;

    this.defaults = {
      mostRecentArticlesData: [],
      notPublishedArticlesData: [],
      pendingApprovalArticlesData: [],
      approvedArticlesData: []
    };

    extendObservable(this, {
      mostRecentArticlesData: this.defaults["mostRecentArticlesData"],
      notPublishedArticlesData: this.defaults["notPublishedArticlesData"],
      pendingApprovalArticlesData: this.defaults["pendingApprovalArticlesData"],
      approvedArticlesData: this.defaults["approvedArticlesData"],
      setMostRecentArticles: action(values => {
        this.mostRecentArticlesData = values;
      }),
      setNotPublishedArticles: action(values => {
        this.notPublishedArticlesData = values;
      }),
      setPendingApprovalArticles: action(values => {
        this.pendingApprovalArticlesData = values;
      }),
      setApprovedArticles: action(values => {
        this.approvedArticlesData = values;
      }),
      addNewArticle: action(() => {
        this.routerStore.history.push("/articles/edit?id=-1");
      }),
      resetStore: action(() => {
        this.mostRecentArticlesData = this.defaults["mostRecentArticlesData"];
        this.notPublishedArticlesData = this.defaults["notPublishedArticlesData"];
      })
    });

    autorun(() => {
      if (this.routerStore.isArticlesTab) {
        this.getInitialData();
      } else {
        this.resetStore();
      }
    });
  }

  getInitialData() {
    this.getMostRecentArticles();
    this.getNotPublishedArticles();
    this.getPendingApprovalArticles();
  }

  getMostRecentArticles() {
    this.cmsApi.getMostRecentArticles().then(data => {
      this.setMostRecentArticles(data);
    });
  }

  getNotPublishedArticles() {
    this.cmsApi.getNotPublishedArticles().then(data => {
      this.setNotPublishedArticles(data);
    });
  }

  getPendingApprovalArticles() {
    this.cmsApi.getPendingApprovalArticles().then(data => {
      this.setPendingApprovalArticles(data);
    });
  }

  get mostRecentArticles() {
    return this.mostRecentArticlesData.map(a => ({
      articleId1: a.articleId,
      articleId: a.articleId,
      title: a.title,
      subject: a.subject,
      datePosted: a.datePosted,
      authorName: a.author.firstName + " " + a.author.lastName
    }));
  }

  get notPublishedArticles() {
    return this.notPublishedArticlesData.map(a => ({
      articleId1: a.articleId,
      articleId: a.articleId,
      title: a.title,
      subject: a.subject,
      datePosted: a.datePosted,
      authorName: a.author.firstName + " " + a.author.lastName
    }));
  }

  get pendingApprovalArticles() {
    return this.pendingApprovalArticlesData.map(a => ({
      articleId1: a.articleId,
      articleId: a.articleId,
      title: a.title,
      subject: a.subject,
      datePosted: a.datePosted,
      authorName: a.author.firstName + " " + a.author.lastName
    }));
  }

  get publishedArticles() {
    return this.approvedArticlesData.map(a => ({
      articleId1: a.articleId,
      articleId: a.articleId,
      title: a.title,
      subject: a.subject,
      datePosted: a.datePosted,
      authorName: a.author.firstName + " " + a.author.lastName
    }));
  }
}

decorate(ArticleAdminStore, {
  mostRecentArticles: computed,
  notPublishedArticles: computed,
  pendingApprovalArticles: computed,
  publishedArticles: computed
});

export default ArticleAdminStore;
