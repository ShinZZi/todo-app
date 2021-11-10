import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { itemsInProgress, itemsCompleted } from "./data";
import { v4 } from "uuid";
import "./App.css";
import Board from "./components/Board";

function App() {
  const [state, setState] = useState({
    "in-progress": {
      id: v4(),
      title: "In Progress",
      items: itemsInProgress,
    },

    done: {
      id: v4(),
      title: "Complete",
      items: itemsCompleted,
    },
  });

  const onDragEnd = ({ destination, source }) => {
    if (!destination) return;
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    )
      return;

    console.log("from ", source);
    console.log("to ", destination);

    // Copy item for adding later
    let itemCopy = {};
    Object.keys(state).forEach((el) => {
      if (state[el].id === source.droppableId) {
        itemCopy = state[el].items[source.index];
      }
    });
    console.log(itemCopy);

    setState((prev) => {
      // Remove Item when user drag away
      Object.keys(prev).forEach((el) =>
        prev[el].id === source.droppableId
          ? prev[el].items.splice(source.index, 1)
          : el
      );

      // Add Item into droppable column
      Object.keys(prev).map((el) =>
        prev[el].id === destination.droppableId
          ? prev[el].items.splice(destination.index, 0, itemCopy)
          : el
      );
      return prev;
    });
  };

  return (
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd}>
        {/*  ['todo', 'in-progress', 'done']  */}
        {Object.keys(state).map((data, index) => (
          <div key={index} className="column">
            <Board data={state[data]} />
          </div>
        ))}
      </DragDropContext>
    </div>
  );
}

export default App;
