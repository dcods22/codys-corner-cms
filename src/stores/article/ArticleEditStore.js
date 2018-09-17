import { decorate, extendObservable, action, computed, autorun } from "mobx";
import queryString from "query-string";

class ArticleEditStore {
  constructor(routerStore, ccApi, cmsApi) {
    this.routerStore = routerStore;
    this.ccApi = ccApi;
    this.cmsApi = cmsApi;

    this.defaults = {
      article: {
        article: "",
        title: "",
        subject: "",
        articleImg: ""
      },
      articleId: -1,
      selectedTags: [],
      tags: []
    };

    extendObservable(this, {
      article: this.defaults["article"],
      articleId: this.defaults["articleId"],
      selectedTags: this.defaults["selectedTags"],
      tags: this.defaults["tags"],
      test: [],
      setArticle: action(value => {
        this.article = value;
      }),
      setTags: action(value => {
        this.tags = value;
      }),
      setSelectedTags: action(value => {
        this.selectedTags = value;
      }),
      onChange: action((key, value) => {
        this.article[key] = value;
      }),
      updateFromUrl: action(search => {
        let params = queryString.parse(search);
        this.articleId = params["id"];
      })
    });

    autorun(() => {
      if (this.routerStore.isArticleEditTab) {
        this.getInitialData();
        this.updateFromUrl(this.routerStore.location.search);
        if (this.articleId !== this.defaults["articleId"]) {
          this.getArticle(this.articleId);
        }
      }
    });
  }

  getArticle(articleId) {
    this.ccApi.getArticle(articleId).then(data => {
      this.setArticle(data);
    });
  }

  getInitialData() {
    this.getAllTags();
  }

  getAllTags() {
    this.ccApi.getAllTags().then(data => {
      this.setTags(data);
    });
  }

  get tagOptions() {
    let options = [];
    for (let i = 0; i < this.tags.length; i++) {
      let t = this.tags[i];
      options.push({ label: t.tag, value: t });
    }
    return options;
  }
}

decorate(ArticleEditStore, {
  tagOptions: computed
});

export default ArticleEditStore;
