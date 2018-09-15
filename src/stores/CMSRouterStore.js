import { decorate, computed } from "mobx";
import { RouterStore } from "mobx-react-router";

class CMSRouterStore extends RouterStore {
  get isHomeTab() {
    return true;
  }
}

decorate(CMSRouterStore, {
  isHomeTab: computed
});

export default CMSRouterStore;
