import axios from "axios";

const api = axios.create({
  baseURL: "/api/wine"
});

const writeService = {
  saveWine: vinmonopoletId => {
    return api
      .post(vinmonopoletId)
      .then(response => {
        return {
          success: true
        };
      })
      .catch(error => {
        return {
          success: false,
          error
        };
      });
  }
};

export default writeService;
