import axios from "axios";

const API_URL = "http://localhost:3000/api/";

// Create an Axios instance for API calls
const axiosInstance = axios.create({
  baseURL: API_URL
});

// Interceptor to add the auth token to requests
axiosInstance.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

const register = (username, email, password) => {
  return axiosInstance.post("register", { username, email, password });
};

const login = (username, password) => {
  return axiosInstance
    .post("login", { username, password })
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
  return axiosInstance.get("is-google-linked");
};

const linkGoogleAccount = (idToken) => {
  return axiosInstance.post("link-google", { token: idToken });
};

const unlinkGoogleAccount = async () => {
  return axiosInstance.post("unlink-google");
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
