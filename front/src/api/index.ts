import Axios from "axios";

Axios.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const instance = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default function getRepositoriesByName(name: string) {
  return Axios.get(
    `${process.env.REACT_APP_API_URL}/repositories?owner=${name}`
  );
}

export function handleRepositoryStar(fullName: string) {
  return Axios.post(`${process.env.REACT_APP_API_URL}/repositories/star`, {
    fullName,
  });
}
