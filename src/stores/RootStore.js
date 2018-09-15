import { syncHistoryWithStore } from "mobx-react-router";
import createHistory from "history/createBrowserHistory";
import CMSRouterStore from "./CMSRouterStore";
import AuthStore from "./AuthStore";
import HttpInterceptor from "../api/HttpInterceptor";
import AuthApi from "../api/AuthApi";

class RootStore {
  constructor() {
    this.createApis();
    this.createStores();
  }

  createApis() {
    this.authApi = new AuthApi();
  }

  createStores() {
    this.routerStore = new CMSRouterStore();
    this.history = syncHistoryWithStore(createHistory(), this.routerStore);
    this.authStore = new AuthStore(this.routerStore, this.authApi);
    this.httpInterceptor = new HttpInterceptor(this.authStore);
  }
}

export default RootStore;
