import { extendObservable, action } from "mobx";

class ArticleAdminStore {
  constructor(routerStore, cmsApi) {
    this.routerStore = routerStore;
    this.cmsApi = cmsApi;

    this.getInitialData();

    this.defaults = {
      mostRecentArticles: [],
      notPublishedArticles: []
    };

    extendObservable(this, {
      mostRecentArticles: this.defaults["mostRecentArticles"],
      notPublishedArticles: this.defaults["notPublishedArticles"],
      setMostRecentArticles: action(value => {
        this.mostRecentArticles = value;
      }),
      setNotPublishedArticles: action(value => {
        this.notPublishedArticles = value;
      }),
      addNewArticle: action(() => {
        this.routerStore.history.push("/articles/edit?id=-1");
      })
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
}

export default ArticleAdminStore;
