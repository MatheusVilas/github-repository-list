import axios from "axios";

export default function getRepositoriesByName(name: string) {
  return axios
    .get(`https://api.github.com/users/${name}/repos`)
    .then((response) => response.data);
}
