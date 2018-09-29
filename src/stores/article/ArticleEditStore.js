import { decorate, extendObservable, action, computed, autorun } from "mobx";
import queryString from "query-string";
import { StringUtility } from "../../utils/StringUtility";

class ArticleEditStore {
  constructor(routerStore, ccApi, cmsApi) {
    this.routerStore = routerStore;
    this.ccApi = ccApi;
    this.cmsApi = cmsApi;

    this.defaults = {
      article: {
        articleId: null,
        article: "",
        title: "",
        subject: "",
        articleImg: "",
        imageSource: "",
        tagMappings: [],
        articleStatus: {
          articleStatusMapping: {
            status: null,
            id: null
          }
        }
      },
      articleId: "-1",
      articleStatuses: [],
      selectedTags: [],
      tags: []
    };

    extendObservable(this, {
      article: this.defaults["article"],
      articleId: this.defaults["articleId"],
      articleStatuses: this.defaults["articleStatuses"],
      selectedTags: this.defaults["selectedTags"],
      tags: this.defaults["tags"],
      setArticle: action(value => {
        this.article = value;
      }),
      setArticleStatuses: action(value => {
        this.articleStatuses = value;
      }),
      setArticleStatus: action(value => {
        this.article.articleStatus = value;
      }),
      setTags: action(value => {
        this.tags = value;
      }),
      addSelectedTag: action(value => {
        if (!this.tagExists(value, this.selectedTags)) {
          value.text = StringUtility.toTitleCase(value.text);
          this.selectedTags.push(value);
        }
      }),
      updateSelectedTags: action(tagMappins => {
        if (tagMappins) {
          this.selectedTags = tagMappins.map(t => ({
            text: t.tag.tag,
            id: t.tag.tagId
          }));
        }
      }),
      removeSelectedTag: action(value => {
        this.selectedTags.splice(value, 1);
      }),
      onChange: action((key, value) => {
        this.article[key] = value;
      }),
      updateFromUrl: action(search => {
        let params = queryString.parse(search);
        this.articleId = params["id"].toString();
      }),
      save: action(() => {
        this.cmsApi.saveArticle(this.finalizedArticle).then(data => {
          this.setArticle(data);
          this.routerStore.history.push("/articles/edit?id=" + data.articleId);
        });
      }),
      cancel: action(() => {
        this.routerStore.history.push("/articles");
      }),
      preview: action(() => {
        this.cmsApi.saveArticle(this.finalizedArticle).then(data => {
          this.setArticle(data);
          this.routerStore.history.push("/articles/preview?id=" + data.articleId);
        });
      }),
      resetStore: action(() => {
        this.article = this.defaults["article"];
        this.selectedTags = this.defaults["selectedTags"];
        this.articleId = this.defaults["articleId"];
      })
    });

    autorun(() => {
      if (this.routerStore.isArticleEditTab) {
        this.getInitialData();
        this.updateFromUrl(this.routerStore.location.search);
        if (!this.isNewArticle) {
          this.getArticle(this.articleId);
        }
      } else {
        this.resetStore();
      }
    });

    autorun(() => {
      if (this.isNewArticle) {
        let notPublished = this.articleStatuses.find(as => as.articleStatusMappingId === 1);
        if (notPublished) {
          let mapping = {
            articleId: null,
            articleStatusMapping: notPublished
          };
          this.setArticleStatus(mapping);
        }
      }
    });
  }

  getArticle(articleId) {
    this.ccApi.getArticle(articleId).then(data => {
      this.setArticle(data);
      this.updateSelectedTags(data.tagMappings);
    });
  }

  getInitialData() {
    this.getAllTags();
    this.getArticleStatuses();
  }

  getAllTags() {
    this.ccApi.getAllTags().then(data => {
      this.setTags(data);
    });
  }

  getArticleStatuses() {
    this.ccApi.getArticleStatuses().then(data => {
      this.setArticleStatuses(data);
    });
  }

  tagExists(value, tags) {
    let exists = false;
    for (let i = 0; i < tags.length; i++) {
      if (tags[i].text.toLowerCase() === value.text.toLowerCase()) {
        exists = true;
      }
    }
    return exists;
  }

  createTagMappings(article, selectedTags) {
    let tagMappings = [];
    for (let index in selectedTags) {
      let tag = selectedTags[index];
      if (this.isExistingTagMapping(article, tag)) {
        tagMappings.push(this.findTagMapping(article, tag));
      } else if (!this.isNewTag(tag)) {
        let existing = this.tags.find(t => t.tag === tag.text);
        if (existing) {
          tagMappings.push({ tagMappingId: null, tag: existing });
        } else {
          tagMappings.push({ tagMappingId: null, tag: { tagId: null, tag: tag.text } });
        }
      } else {
        tagMappings.push({ tagMappingId: null, tag: { tagId: null, tag: tag.text } });
      }
    }
    return tagMappings;
  }

  isNewTag(tag) {
    return tag.id === tag.text;
  }

  isExistingTagMapping(article, tag) {
    return !!this.findTagMapping(article, tag);
  }

  findTagMapping(article, tag) {
    let mappings = article.tagMappings;
    let filtered = mappings.filter(a => a.tag.tag === tag.text);
    return filtered && filtered.length ? filtered[0] : null;
  }

  get tagOptions() {
    let options = [];
    for (let i = 0; i < this.tags.length; i++) {
      let t = this.tags[i];
      options.push({ text: t.tag, id: t.tagId });
    }
    return options;
  }

  get finalizedArticle() {
    const finalized = Object.assign({}, this.article);
    finalized.tagMappings = this.createTagMappings(finalized, this.selectedTags);
    return finalized;
  }

  get currentArticleStatus() {
    let article = Object.assign({}, this.article);
    return article.articleStatus ? article.articleStatus.articleStatusMapping.status : "Not Known";
  }

  get isNewArticle() {
    return this.articleId === this.defaults["articleId"];
  }
}

decorate(ArticleEditStore, {
  tagOptions: computed,
  isNewArticle: computed,
  currentArticleStatus: computed
});

export default ArticleEditStore;
