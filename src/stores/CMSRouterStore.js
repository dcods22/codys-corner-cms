import { decorate, computed } from "mobx";
import { RouterStore } from "mobx-react-router";

class CMSRouterStore extends RouterStore {
  get isHomeTab() {
    return this.location.pathname === "/";
  }

  get isArticlesTab() {
    return this.location.pathname === "/articles";
  }
}

decorate(CMSRouterStore, {
  isHomeTab: computed,
  isArticlesTab: computed
});

export default CMSRouterStore;
