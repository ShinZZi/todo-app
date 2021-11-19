import React, { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "../Task/Task";
import "./Card.css";
import { CircularProgress, Box } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CloseIcon from "@mui/icons-material/Close";
import { TaskService } from "../../services/taskService";

function Card(props) {
  const { setDeleteTask } = props;
  const { data, destination, source } = props;
  const [card, setCard] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    let intervalID = setInterval(() => {
      if (data.items !== undefined) {
        setCard(data);
      }
    }, 1000);
    return () => {
      clearInterval(intervalID);
    };
  }, [data]);

  useEffect(() => {
    if (destination !== null) {
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
  }, [card, source, destination]);

  return (
    <>
      <div className="card-title">
        <h2>{card.title}</h2>
        {isEdit === true ? (
          <CloseIcon
            sx={{ fontSize: 20, cursor: "pointer" }}
            color="inherit"
            onClick={() => setIsEdit(false)}
          />
        ) : (
          <ModeEditIcon
            sx={{ fontSize: 20, cursor: "pointer" }}
            color="inherit"
            onClick={() => setIsEdit(true)}
          />
        )}
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
                    <Task
                      setDeleteTask={setDeleteTask}
                      isEdit={isEdit}
                      item={item}
                      index={index}
                    />
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
