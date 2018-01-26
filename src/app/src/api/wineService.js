import axios from "axios";

const api = axios.create({
  baseURL: "/api/wine"
});

const pageSize = 12;

export const fetchMoreWinesFromApi = (status, page) => {
  return api
    .get(`${status}?page=${page}&pageCount=${pageSize}`)
    .then(response => {
      return {
        wines: response.data.wines,
        count: response.data.count
      };
    })
    .catch(error => {
      return {
        error
      };
    });
};
