import React from "react";
import { Draggable } from "react-beautiful-dnd";
import "./Task.css";

function Task(props) {
  const { item, index } = props;
  // console.log(item);
  return (
    <>
      <Draggable key={item.id} index={index} draggableId={item.id}>
        {(provided, snapshot) => {
          return (
            <div ref={provided.innerRef} {...provided.draggableProps}>
              <div className="task-content border">
                {item.name}
                <span {...provided.dragHandleProps}>
                  <i className="fas fa-bars"></i>
                </span>
              </div>
              <div className="clearfix"></div>
            </div>
          );
        }}
      </Draggable>
    </>
  );
}

export default Task;
