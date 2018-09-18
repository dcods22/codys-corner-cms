import { decorate, extendObservable, action, computed, autorun } from "mobx";
import queryString from "query-string";

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
        tagMappings: []
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
      setArticle: action(value => {
        this.article = value;
      }),
      setTags: action(value => {
        this.tags = value;
      }),
      addSelectedTag: action(value => {
        if (!this.tagExists(value, this.selectedTags)) {
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
        this.articleId = params["id"];
      }),
      save: action(() => {
        this.cmsApi.saveArticle(this.finalizedArticle).then(data => {
          this.setArticle(data);
        });
      }),
      cancel: action(() => {
        this.routerStore.history.push("/articles");
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
      this.updateSelectedTags(data.tagMappings);
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

  tagExists(value, tags) {
    let exists = false;
    for (let i = 0; i < tags.length; i++) {
      if (tags[i].text.toLowerCase() === value.text.toLowerCase()) {
        exists = true;
      }
    }
    return exists;
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

  createTagMappings(article, selectedTags) {
    let tagMappings = [];
    let currentTagMappings = article.tagMappings;
    for (let index in selectedTags) {
      let tag = selectedTags[index];
      if (!this.isNewTag(tag)) {
        let existing = currentTagMappings.find(t => t.tag.tag === tag.text);
        if (existing) {
          tagMappings.push(existing);
        } else {
          tagMappings.push({ tagMappingId: null, articleId: article.articleId, tag: { tagId: null, tag: tag.text } });
        }
      } else {
        tagMappings.push({ tagMappingId: null, articleId: article.articleId, tag: { tagId: null, tag: tag.text } });
      }
    }
    return tagMappings;
  }

  isNewTag(tag) {
    return tag.id === tag.text;
  }
}

decorate(ArticleEditStore, {
  tagOptions: computed
});

export default ArticleEditStore;
