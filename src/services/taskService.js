import { CardSetService } from "./cardsetService";
import { CardService } from "./cardService";
import axios from "axios";
import { v4 } from "uuid";
const API_URI = "http://127.0.0.1:9999";

export const TaskService = {
  createNewTask: (user_id, taskName) => {
    CardSetService.getCardSetByUserID(user_id).then((cardset) => {
      CardService.getTodoCard(cardset.id).then(async (todoCard) => {
        // console.log(todoCard.id);
        let response = await axios.get(`${API_URI}/task/card/${todoCard.id}`);
        let tasks = response.data;
        await axios.post(`${API_URI}/task/add`, {
          id: v4(),
          name: taskName,
          card_id: todoCard.id,
          index: tasks.length + 1,
        });
      });
    });
    return 200;
  },
  getTaskByCardID: async (card_id) => {
    let response = await axios.get(`${API_URI}/task/card/${card_id}`);
    return response.data;
  },

  updateTask: async (item, index, destination) => {
    let response = await axios.put(`${API_URI}/task/update/${item.id}`, {
      card_id: destination.droppableId,
      index: index,
      name: item.name,
    });
    return response;
  },

  deleteTask: async (id) => {
    let response = await axios.delete(`${API_URI}/task/del/${id}`);
    return response.data;
  },
};
