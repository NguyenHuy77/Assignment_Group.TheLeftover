import axios from "axios";

const API_URL = "https://assignment-091121.herokuapp.com/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(
    name,
    nationalID,
    phoneNumber,
    workPlace,
    role,
    username,
    email,
    password
  ) {
    return axios.post(API_URL + "signup", {
      name,
      nationalID,
      phoneNumber,
      workPlace,
      role,
      username,
      email,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
