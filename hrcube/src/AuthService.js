import axios from "axios";

const API_URL = "http://localhost:3000/api/";

const register = (username, email, password) => {
  return axios.post(API_URL + "register", { username, email, password });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "login", { username, password })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const isGoogleLinked = async () => {
  return axios.get(API_URL + "is-google-linked");
};

const linkGoogleAccount = (idToken) => {
  return axios.post(API_URL + "link-google", { token: idToken });
};

const unlinkGoogleAccount = async () => {
  return axios.post(API_URL + "unlink-google");
};

const AuthService = {
  login,
  logout,
  register,
  isGoogleLinked,
  unlinkGoogleAccount,
  linkGoogleAccount,
};

export default AuthService;
