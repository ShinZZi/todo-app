import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";

function Board(props) {
  const { data } = props;
  return (
    <>
      <h4>{data.title}</h4>
      <Droppable droppableId={data.id}>
        {(provided) => {
          return (
            <div
              className="droppable-col"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {data.items.map((item, index) => (
                <div key={index}>
                  <Card item={item} index={index} />
                </div>
              ))}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </>
  );
}

export default Board;
