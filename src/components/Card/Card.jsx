import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "../Task/Task";
import "./Card.css";

function Card(props) {
  const { data } = props;
  return (
    <>
      <div className="card-title">
        <h2>{data.title}</h2>
      </div>
      <Droppable droppableId={data.id}>
        {(provided) => {
          return (
            <div
              className="card-body"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {data.items.map((item, index) => (
                <div key={index} className="card-task">
                  <Task item={item} index={index} />
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

export default Card;
