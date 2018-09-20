import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL + "/cms/api";

class CMSApi {
  getMostRecentArticles() {
    const url = BASE_URL + "/articles/mostRecent";
    return axios.get(url).then(response => response.data.entity);
  }

  getNotPublishedArticles() {
    const url = BASE_URL + "/articles/notPublished";
    return axios.get(url).then(response => response.data.entity);
  }

  saveArticle(article) {
    const url = BASE_URL + "/articles";
    return axios.post(url, article).then(response => response.data.entity);
  }
}

export default CMSApi;
