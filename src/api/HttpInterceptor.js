import axios from "axios";

class ZeHttpInterceptor {
  constructor(authStore) {
    this.loadingCount = [];
    axios.interceptors.request.use(
      config => {
        const ignoreUrls = ["/oauth/token"];
        // Do something before request is sent
        let ignoreUrl = ignoreUrls.some(c => {
          return config.url.indexOf(c) > 0;
        });
        if (!ignoreUrl) {
          config.headers.Authorization = `Bearer ${authStore.accessToken}`;
        }
        return config;
      },
      error => {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      response => {
        this.loadingCount.splice(0, 1);
        return response;
      },
      error => {
        // Do something with response error
        if (error) {
          if (error.response && error.response.data) {
            if ("invalid_token" === error.response.data.error) {
              authStore.refresh();
            } else if ("invalid_grant" === error.response.data.error) {
              authStore.logout();
            } else {
              // let message =
              //   error.response.data.error_description ||
              //   error.response.data.message ||
              //   error.response.message;
              //
              // alertStore.addAlert({
              //   type: Alerts.DANGER,
              //   text: "Error: " + message
              // });
            }
          }
        }
        return Promise.reject(error);
      }
    );
  }
}

export default ZeHttpInterceptor;
