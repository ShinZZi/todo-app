import axios from "axios";
import { API_URI } from "../config/api.config";

export const CardService = {
  getTodoCard: async (cardSetId) => {
    let cards = await axios.get(
      `${API_URI}/api/card/todo?cardset_id=${cardSetId}`
    );
    return cards.data;
  },
  getCardByCardSetID: async (cardSetId) => {
    let cards = await axios.get(`${API_URI}/api/card/cardset/${cardSetId}`);
    return cards.data;
  },
};
