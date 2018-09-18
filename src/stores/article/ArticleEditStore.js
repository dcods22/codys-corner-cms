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
      addSelectedTag: action(value => {
        console.log(value);
        this.selectedTags.push(value);
      }),
      removeSelectedTag: action(value => {
        this.selectedTags.splice(value, 1);
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
      options.push({ text: t.tag, id: t.tagId });
    }
    return options;
  }
}

decorate(ArticleEditStore, {
  tagOptions: computed
});

export default ArticleEditStore;
