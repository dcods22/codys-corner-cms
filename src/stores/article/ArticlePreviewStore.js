import { decorate, computed, action, autorun, extendObservable } from "mobx";
import queryString from "query-string";
class ArticlePreviewStore {
  constructor(routerStore, ccApi, cmsApi) {
    this.routerStore = routerStore;
    this.ccApi = ccApi;
    this.cmsApi = cmsApi;

    this.defaults = {
      article: {},
      articleId: -1
    };

    extendObservable(this, {
      articleId: this.defaults["articleId"],
      article: this.defaults["article"],
      setArticle: action(value => {
        this.article = value;
      }),
      updateFromUrl: action(search => {
        let params = queryString.parse(search);
        this.articleId = params["id"].toString();
      }),
      resetStore: action(() => {
        this.article = this.defaults["article"];
      }),
      cancel: action(() => {
        this.routerStore.history.push("/articles");
      })
    });

    autorun(() => {
      if (this.routerStore.isArticlePreviewTab) {
        this.updateFromUrl(this.routerStore.location.search);
        this.getArticle();
      } else {
        this.resetStore();
      }
    });
  }

  getArticle() {
    this.ccApi.getArticle(this.articleId).then(data => {
      this.setArticle(data);
    });
  }

  get currentArticleStatus() {
    let article = Object.assign({}, this.article);
    return article.articleStatus ? article.articleStatus.articleStatusMapping.status : "Not Known";
  }

  get tags() {
    return this.article && this.article.tagMappings ? this.article.tagMappings.map(t => t.tag) : [];
  }
}

decorate(ArticlePreviewStore, {
  currentArticleStatus: computed,
  tags: computed
});

export default ArticlePreviewStore;
