import axios from "axios";

const API_URL = "http://localhost:8000/api/login/";
const csrfToken = getCookie("csrftoken");
axios.defaults.headers.common["X-CSRFToken"] = csrfToken;

function getCookie(cookieName) {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
}

const login = (username, password) => {
  return axios.post(API_URL, { username, password }).then((response) => {
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem("user");
};

const register = (username, email, password) => {
  return axios.post(API_URL + "register/", {
    username,
    email,
    password,
  });
};

const AuthService = {
  login,
  logout,
  register,
};

export default AuthService;
