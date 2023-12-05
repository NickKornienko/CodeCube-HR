import axios from "axios";

const API_URL = "http://localhost:3000/api/";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

const getTimesheetsForUser = (startDate, endDate) => {
  return axiosInstance.get(
    `timesheets?startDate=${startDate}&endDate=${endDate}`
  );
};

const getTimeoffForUser = (startDate, endDate) => {
  return axiosInstance.get(`timeoff?startDate=${startDate}&endDate=${endDate}`);
};

const sendTimesheetData = (userId, timesheetData) => {
  // TODO: Implement POST request to send timesheet data
};

const sendTimeoffData = (timeoffData) => {
  return axiosInstance.post("timeoff", timeoffData);
};

const DbService = {
  getTimesheetsForUser,
  getTimeoffForUser,
  sendTimesheetData,
  sendTimeoffData,
};

export default DbService;
