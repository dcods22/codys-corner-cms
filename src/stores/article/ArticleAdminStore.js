import { extendObservable, action, autorun, decorate, computed } from "mobx";

class ArticleAdminStore {
  constructor(routerStore, cmsApi) {
    this.routerStore = routerStore;
    this.cmsApi = cmsApi;

    this.defaults = {
      mostRecentArticlesData: [],
      notPublishedArticlesData: []
    };

    extendObservable(this, {
      mostRecentArticlesData: this.defaults["mostRecentArticlesData"],
      notPublishedArticlesData: this.defaults["notPublishedArticlesData"],
      setMostRecentArticles: action(value => {
        this.mostRecentArticlesData = value;
      }),
      setNotPublishedArticles: action(value => {
        this.notPublishedArticlesData = value;
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

  get mostRecentArticles() {
    return this.mostRecentArticlesData.map(a => ({
      articleId: a.articleId,
      title: a.title,
      subject: a.subject,
      datePosted: a.datePosted,
      authorName: a.author.firstName + " " + a.author.lastName
    }));
  }
  get notPublishedArticles() {
    return this.notPublishedArticlesData.map(a => ({
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
  notPublishedArticles: computed
});

export default ArticleAdminStore;
