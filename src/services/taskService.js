import axios from "axios";

export const TaskService = {
  getTaskInCard: async (id) => {
    let tasks = await axios.get(`http://127.0.0.1:9999/task/card/${id}`);
    return tasks.data;
  },

  updateTask: async (item, index, destination) => {
    let response = await axios.put(
      `http://127.0.0.1:9999/task/update/${item.id}`,
      {
        card_id: destination.droppableId,
        index: index,
        name: item.name,
      }
    );
    return response;
  },

  deleteTask: async (id) => {
    let response = await axios.delete(`http://127.0.0.1:9999/task/del/${id}`);
    return response.data;
  },
};
