import React from "react";
import { Draggable } from "react-beautiful-dnd";

function Card(props) {
  const { item, index } = props;
  // console.log(item, index);
  return (
    <>
      <Draggable key={item.id} index={index} draggableId={item.id}>
        {(provided) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="droppable-item"
            >
              {item.name}
            </div>
          );
        }}
      </Draggable>
    </>
  );
}

export default Card;
