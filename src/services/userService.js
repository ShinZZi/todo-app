import axios from "axios";
const API_URI = "http://127.0.0.1:9999";

export const UserService = {
  getUser: async (username) => {
    let response = await axios.get(`${API_URI}/user/${username}`);
    return response.data[0];
  },
};
