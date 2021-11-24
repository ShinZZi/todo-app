import { CardSetService } from "./cardsetService";
import { CardService } from "./cardService";
import axios from "axios";
import { API_URI } from "../config/api.config";

export const TaskService = {
  createNewTask: async (user_id, taskName) => {
    let cardset = await CardSetService.getCardSetByUserID(user_id);
    let todoCard = await CardService.getTodoCard(cardset.id);
    // GET TASKS TO COUNT LENGTH
    let tasks = await (
      await axios.get(`${API_URI}/api/task/card/${todoCard.id}`)
    ).data;

    let result = axios.post(`${API_URI}/api/task/add`, {
      index: tasks.length,
      name: taskName,
      card_id: todoCard.id,
    });
    return result;
  },
  getTaskByCardID: async (card_id) => {
    let response = await axios.get(`${API_URI}/api/task/card/${card_id}`);
    return response.data;
  },
  updateTask: async (task, index, destination) => {
    let response = await axios.put(`${API_URI}/api/task/update/${task.id}`, {
      index: index,
      name: task.name,
      card_id: destination.droppableId,
    });
    return response;
  },
  deleteTask: async (task_id) => {
    let response = await axios.delete(`${API_URI}/api/task/delete/${task_id}`);
    return response;
  },
};
