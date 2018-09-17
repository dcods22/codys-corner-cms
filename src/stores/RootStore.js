import { syncHistoryWithStore } from "mobx-react-router";
import createHistory from "history/createBrowserHistory";
import CMSRouterStore from "./CMSRouterStore";
import AuthStore from "./AuthStore";
import HttpInterceptor from "../api/HttpInterceptor";
import AuthApi from "../api/AuthApi";
import ArticleAdminStore from "./article/ArticleAdminStore";
import CMSApi from "../api/CMSApi";
import CCApi from "../api/CCApi";
import ArticleEditStore from "./article/ArticleEditStore";

class RootStore {
  constructor() {
    this.createApis();
    this.createStores();
  }

  createApis() {
    this.authApi = new AuthApi();
    this.ccApi = new CCApi();
    this.cmsApi = new CMSApi();
  }

  createStores() {
    this.routerStore = new CMSRouterStore();
    this.history = syncHistoryWithStore(createHistory(), this.routerStore);
    this.authStore = new AuthStore(this.routerStore, this.authApi);
    this.httpInterceptor = new HttpInterceptor(this.authStore);
    this.articleAdminStore = new ArticleAdminStore(this.routerStore, this.cmsApi);
    this.articleEditStore = new ArticleEditStore(this.routerStore, this.ccApi, this.cmsApi);
  }
}

export default RootStore;
