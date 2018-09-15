import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

class CMSApi {
  getMostRecentArticles() {
    const url = "";
    return axios.get(url).then(response => response.data);
  }

  getNotPublishedArticles() {
    const url = "";
    return axios.get(url).then(response => response.data);
  }
}

export default CMSApi;
