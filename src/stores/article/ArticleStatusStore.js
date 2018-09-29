import { extendObservable, action } from "mobx";
import { ArticleStatus as ArticleStatusConstants } from "../../constants/ArticleStatusConstants";
import queryString from "query-string";

class ArticleStatusStore {
  constructor(routerStore, ccApi, cmsApi) {
    this.routerStore = routerStore;
    this.ccApi = ccApi;
    this.cmsApi = cmsApi;

    this.defaults = {
      articleId: -1,
      articleStatus: { name: "" },
      modalOpen: false
    };

    extendObservable(this, {
      articleId: this.defaults["articleId"],
      articleStatus: this.defaults["articleStatus"],
      modalOpen: this.defaults["modalOpen"],
      setArticleStatus: action(value => {
        this.articleStatus = value;
      }),
      toggleModalOpen: action(() => {
        this.modalOpen = !this.modalOpen;
      }),
      notPublished: action(() => {
        this.toggleModalOpen();
        this.setArticleStatus(ArticleStatusConstants.NOT_PUBLISHED);
      }),
      pendingApproval: action(() => {
        this.toggleModalOpen();
        this.setArticleStatus(ArticleStatusConstants.PENDING_APPROVAL);
      }),
      published: action(() => {
        this.toggleModalOpen();
        this.setArticleStatus(ArticleStatusConstants.PUBLISHED);
      }),
      removed: action(() => {
        this.toggleModalOpen();
        this.setArticleStatus(ArticleStatusConstants.REMOVED);
      }),
      updateFromUrl: action(search => {
        let params = queryString.parse(search);
        this.articleId = params["id"].toString();
      }),
      update: action(() => {
        this.updateFromUrl(this.routerStore.location.search);
        this.updateArticleStatus();
      })
    });
  }

  updateArticleStatus = () => {
    this.cmsApi.updateArticleStatus(this.articleId, this.articleStatus.id).then(data => {
      this.routerStore.refresh();
    });
  };
}

export default ArticleStatusStore;
