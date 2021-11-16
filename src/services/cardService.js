import axios from "axios";
const API_URI = "http://127.0.0.1:9999";

export const CardService = {
  getTodoCard: async (cardSetId) => {
    let cards = await axios.get(`${API_URI}/card/todo/cardset/${cardSetId}`);
    return cards.data[0];
  },
  getCardByCardSetID: async (cardId) => {
    let cards = await axios.get(`${API_URI}/card/cardset/${cardId}`);
    return cards.data;
  },
};
