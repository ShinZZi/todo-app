import React from "react";
import { Draggable } from "react-beautiful-dnd";

function Card(props) {
  const { item, index } = props;
  return (
    <>
      <Draggable key={item.id} index={index} draggableId={item.id}>
        {(provided) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              className="droppable-item"
            >
              <input type="checkbox" name="completed" />
              {item.name}{" "}
              <span {...provided.dragHandleProps}>
                <i class="fas fa-bars icon"></i>
              </span>
            </div>
          );
        }}
      </Draggable>
    </>
  );
}

export default Card;
