import { v4 } from "uuid";

export const itemsTodo = [
  {
    id: v4(),
    name: "Clean the house",
  },
  {
    id: v4(),
    name: "Do homework",
  },
  {
    id: v4(),
    name: "Washing dishes",
  },
];

export const itemsCompleted = [
  {
    id: v4(),
    name: "Sing a song",
  },
];

export const itemsInProgress = [];

export const card = [
  {
    id: v4(),
    title: "Todo",
    items: itemsTodo,
  },
  {
    id: v4(),
    title: "In Progress",
    items: itemsInProgress,
  },
  {
    id: v4(),
    title: "Completed",
    items: itemsCompleted,
  },
];
