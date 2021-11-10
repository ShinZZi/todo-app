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

    // console.log("from ", source);
    // console.log("to ", destination);

    // Find out which column the user drag item
    Object.keys(state).forEach(async (el) => {
      let column = state[el];

      if (column.id === source.droppableId) {
        const itemList = Array.from(column.items);
        itemList.splice(source.index, 1);
        itemList.splice(destination.index, 0, column.items[source.index]);
        let newObj = state;
        // Object.keys(state).forEach((el) => {
        //   if (state[el].id !== column.id) {
        //     newObj[el] = state[el];
        //   } else {
        //     newObj[el] = state[el];
        //     newObj[el].items = itemList;
        //   }
        // });
        console.log(newObj);
      }
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
