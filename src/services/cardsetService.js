import axios from "axios";
import { API_URI } from "../config/api.config";

export const CardSetService = {
  getCardSetByUserID: async (userId) => {
    let cards = await axios.get(`${API_URI}/api/cardset/user/${userId}`);
    return cards.data;
  },
};
