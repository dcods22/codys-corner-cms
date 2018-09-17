import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL + "/cc-services/api";

class CCApi {
  getArticle = articleId => {
    const URL = BASE_URL + "/articles/" + articleId;
    return axios.get(URL).then(response => response.data);
  };

  getAllTags = () => {
    const URL = BASE_URL + "/tags";
    return axios.get(URL).then(response => response.data);
  };
}

export default CCApi;
