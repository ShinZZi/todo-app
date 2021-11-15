import axios from "axios";

export const CardService = {
  getCard: async () => {
    let cards = await axios.get("http://127.0.0.1:9999/card");
    return cards.data;
  },
};
