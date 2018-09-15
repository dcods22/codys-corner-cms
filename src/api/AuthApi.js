import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

class AuthApi {
  healthCheck = () => {
    const url = BASE_URL + "/actuator/health";
    return axios.get(url).then(response => response.data);
  };

  getUser = () => {
    const url = BASE_URL + "/cms/api/user";
    return axios.get(url).then(response => response.data);
  };

  getToken = body => {
    const client = btoa("codyscorner:secret");
    return axios({
      url: BASE_URL + "/oauth/token",
      method: "post",
      headers: {
        Accept: "application/json",
        Authorization: `Basic ${client}`,
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
      },
      data: body
    }).then(response => response.data);
  };
}

export default AuthApi;
