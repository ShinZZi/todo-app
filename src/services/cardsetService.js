import axios from "axios";
const API_URI = "http://127.0.0.1:9999";

export const CardSetService = {
  getCardSetByUserID: async (userId) => {
    let cards = await axios.get(`${API_URI}/cardset/user/${userId}`);
    return cards.data[0];
  },
};
