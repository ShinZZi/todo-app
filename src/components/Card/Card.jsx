import React, { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "../Task/Task";
import "./Card.css";
import { CircularProgress, Box } from "@mui/material";
import { TaskService } from "../../services/taskService";

function Card(props) {
  const { data, destination, source } = props;
  const [card, setCard] = useState([]);

  useEffect(() => {
    let intervalID = setInterval(() => {
      if (data.items !== undefined) {
        setCard(data);
        clearInterval(intervalID);
      }
    }, 1000);
    // eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    if (destination !== null && data.items !== undefined) {
      if (card.id === source.droppableId) {
        card.items.map((item, index) => {
          TaskService.updateTask(item, index, source);
          return item;
        });
      }

      if (card.id === destination.droppableId) {
        card.items.map((item, index) => {
          TaskService.updateTask(item, index, destination).then();
          return item;
        });
      }
    }
  }, [data.items, card, source, destination]);

  return (
    <>
      <div className="card-title">
        <h2>{card.title}</h2>
      </div>
      {card.items !== undefined ? (
        <Droppable droppableId={data.id}>
          {(provided) => {
            return (
              <div
                className="card-body"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {card.items.map((item, index) => (
                  <div key={index} className="card-task">
                    <Task item={item} index={index} />
                  </div>
                ))}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      ) : (
        <Box sx={{ display: "flex", margin: "auto" }}>
          <CircularProgress color="inherit" />
        </Box>
      )}
    </>
  );
}

export default Card;
