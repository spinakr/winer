import axios from "axios";

const api = axios.create({
  baseURL: "/api/wine"
});

const readService = {
  fetchMoreWinesFromApi: (status, page) => {
    const pageSize = 12;
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
  },

  searchWine: vinmonopoletId => {
    return api
      .get(vinmonopoletId)
      .then(response => {
        return { wine: response.data };
      })
      .catch(error => {
        return { error };
      });
  }
};

export default readService;
