import { decorate, computed } from "mobx";
import { RouterStore } from "mobx-react-router";

class CMSRouterStore extends RouterStore {
  get isHomeTab() {
    return this.location.pathname === "/";
  }

  get isArticlesTab() {
    return this.location.pathname === "/articles";
  }

  get isArticleEditTab() {
    return this.location.pathname === "/articles/edit";
  }
  get isArticlePreviewTab() {
    return this.location.pathname === "/articles/preview";
  }

  refresh() {
    this.go();
  }
}

decorate(CMSRouterStore, {
  isHomeTab: computed,
  isArticlesTab: computed
});

export default CMSRouterStore;
