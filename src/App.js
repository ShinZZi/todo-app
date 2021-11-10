import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { itemsTodo, itemsInProgress, itemsCompleted } from "./data";
import { v4 } from "uuid";
import "./App.css";

function App() {
  const [state, setState] = useState({
    todo: {
      id: v4(),
      title: "Todo",
      items: itemsTodo,
    },

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

    const itemm = Array.from(itemsTodo);
    console.log(itemm.source);
    console.log("from ", source);
    console.log("to ", destination);
  };

  return (
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd}>
        {/*  ['todo', 'in-progress', 'done']  */}
        {Object.keys(state).map((data, index) => {
          return (
            // Return the column for each tag
            <div key={index} className="column">
              <h4>{state[data].title}</h4>
              <Droppable droppableId={state[data].id}>
                {(provided) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="droppable-col"
                    >
                      {provided.placeholder}
                      {/* Get values of item  */}
                      {state[data].items.map((el, index) => {
                        return (
                          <Draggable
                            key={el.id}
                            index={index}
                            draggableId={el.id}
                          >
                            {(provided) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="droppable-item"
                                >
                                  {el.name}
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default App;
