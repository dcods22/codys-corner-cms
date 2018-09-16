import { action, decorate, extendObservable, observable, computed } from "mobx";
import { AuthConstants } from "../constants/AuthConstants";

class AuthStore {
  constructor(routerStore, authApi) {
    this.routerStore = routerStore;
    this.authApi = authApi;

    this.defaults = {
      mobileNavOpen: false,
      isAdmin: false,
      accessToken: "",
      authorities: [],
      refreshToken: "",
      loginError: false,
      isLoggingIn: false,
      refreshInProgress: false,
      user: observable.map()
    };

    extendObservable(this, {
      mobileNavOpen: this.defaults["mobileNavOpen"],
      accessToken: this.defaults["accessToken"],
      isAdmin: this.defaults["isAdmin"],
      authorities: this.defaults["authorities"],
      refreshToken: this.defaults["refreshToken"],
      loginError: this.defaults["loginError"],
      refreshInProgress: this.defaults["refreshInProgress"],
      isLoggingIn: this.defaults["isLoggingIn"],
      user: this.defaults["user"],
      login: action((username, password) => {
        this.isLoggingIn = true;
        this.loginError = false;
        const body = {
          grant_type: "password",
          username: username,
          password: password,
          client_id: "codyscorner"
        };
        const encodedBody = this.serialize(body);
        this.authApi.getToken(encodedBody).then(data => {
          this.setLoggedIn(data);
          this.isLoggingIn = false;
          // localStorage.setItem(AuthConstants.KEYS.AUTHORITIES, JSON.stringify(data.authorities));
          this.authorities = data.authorities;
          if (!data || (data.error || (data.data && data.data.error))) {
            this.loginError = true;
          } else {
            this.routerStore.history.push("/");
          }
        });
      }),
      logout: action(() => {
        localStorage.clear();
        this.resetStore();
        this.routerStore.history.push("/login");
      }),
      setUser: action(data => {
        this.user.merge(data);
      }),
      setLoggedIn: action(data => {
        this.accessToken = data.access_token;
        this.refreshToken = data.refresh_token;
        this.setLocalStorage();
      }),
      refresh: action(() => {
        if (this.refreshToken && !this.refreshInProgress) {
          this.refreshInProgress = true;
          const body = {
            grant_type: "refresh_token",
            refresh_token: this.refreshToken
          };
          const encodedBody = this.serialize(body);

          this.authApi.getToken(encodedBody).then(data => {
            if (data) {
              this.setLoggedIn(data);
            }
            this.refreshInProgress = false;
          });
        }
      }),
      checkLocalStorage: action(() => {
        this.accessToken = localStorage.getItem(AuthConstants.KEYS.ACCESS_TOKEN);
        this.refreshToken = localStorage.getItem(AuthConstants.KEYS.REFRESH_TOKEN);
        // let user = JSON.parse(localStorage.getItem(AuthConstants.KEYS.USER));
        // this.user = observable.map().merge(user);
        // this.authorities = JSON.parse(localStorage.getItem(AuthConstants.KEYS.AUTHORITIES));
      }),
      setLocalStorage: action(() => {
        localStorage.setItem(AuthConstants.KEYS.ACCESS_TOKEN, this.accessToken);
        localStorage.setItem(AuthConstants.KEYS.REFRESH_TOKEN, this.refreshToken);
      }),
      resetStore: action(() => {
        this.user = this.defaults["user"];
        this.accessToken = this.defaults["accessToken"];
        this.refreshToken = this.defaults["refreshToken"];
        this.authorities = this.defaults["authorities"];
        this.isAdmin = this.defaults["isAdmin"];
      })
    });

    this.checkLocalStorage();
  }

  serialize(obj) {
    let str = [];
    for (let p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    }
    return str.join("&");
  }

  get isLoggedIn() {
    return this.accessToken && this.accessToken.length > 0; // && !!this.user && !!this.user.toJSON().userId;
  }
}

decorate(AuthStore, {
  isLoggedIn: computed
});

export default AuthStore;
