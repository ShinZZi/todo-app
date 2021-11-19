import axios from "axios";
import { API_URI } from "../config/api.config";

export const AuthService = {
  signin: async (username, password) => {
    let response = await axios.post(`${API_URI}/api/auth/signin`, {
      name: username,
      password: password,
    });
    return response;
  },
  signup: async (username, password) => {
    let response = await axios.post(`${API_URI}/api/auth/signup`, {
      name: username,
      password: password,
    });
    return response;
  },
  authenticate: async () => {
    try {
      let response = await axios.post(`${API_URI}/api/auth`);
      return response;
    } catch (error) {
      return error.response;
    }
  },
};
