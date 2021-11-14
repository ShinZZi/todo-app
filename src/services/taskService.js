import axios from "axios";

export async function getCard() {
  let cards = await axios.get("http://127.0.0.1:9999/card");
  return cards.data;
}

export async function getTask(id) {
  let tasks = await axios.get(`http://127.0.0.1:9999/task/card/${id}`);
  return tasks.data;
}

export async function deleteTask(id) {
  let response = await axios.delete(`http://127.0.0.1:9999/task/del/${id}`);
  return response.data;
}

export async function addTaskToCard(item, destination) {
  await axios.put(`http://127.0.0.1:9999/task/update/${item.id}`, {
    card_id: destination.droppableId,
  });
}
