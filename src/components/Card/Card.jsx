import React, { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "../Task/Task";
import { getTask } from "../../services/taskService";
import "./Card.css";

function Card(props) {
  const { getItemCopy, card, source, destination, setCheckCopy } = props;
  const [task, setTask] = useState([]);
  // console.log(destination.droppableId, itemCopy);

  useEffect(() => {
    // GET ITEM
    if (source !== null) {
      if (source.droppableId === card.id) {
        getItemCopy(task[source.index]);
        setCheckCopy(true);
      }
    }
    // eslint-disable-next-line
  }, [source]);

  useEffect(() => {
    getTask(card.id).then((response) => {
      setTask(response.map((task) => task));
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="card-title">
        <h2>{card.title}</h2>
      </div>
      <Droppable droppableId={card.id}>
        {(provided) => {
          return (
            <div
              className="card-body"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {task.map((item, index) => (
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
