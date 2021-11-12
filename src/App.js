import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 } from "uuid";
import "./App.css";
import Header from "./components/Header/Header";
import Card from "./components/Card/Card";
import { itemsCompleted, itemsInProgress, itemsTest } from "./data";

function App() {
  const [state, setState] = useState({
    "in-progress": {
      id: v4(),
      title: "In Progress",
      items: itemsInProgress,
    },
    test: {
      id: v4(),
      title: "Test",
      items: itemsTest,
    },
    done: {
      id: v4(),
      title: "Completed",
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
      <Header />
      <div className="content">
        <DragDropContext onDragEnd={onDragEnd}>
          {/*  ['todo', 'in-progress', 'done']  */}
          {Object.keys(state).map((data, index) => (
            <div key={index} className="card">
              <Card data={state[data]} />
            </div>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
