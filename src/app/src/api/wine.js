import axios from "axios";

console.log(process.env);

export default axios.create({
  baseURL: "/api/wine"
});
