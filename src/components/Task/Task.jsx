import React, { useState, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Box, LinearProgress } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import MenuIcon from "@mui/icons-material/Menu";
import { TaskService } from "../../services/taskService";
import "./Task.css";

function Task(props) {
  const { item, index, isEdit, setDeleteTask } = props;
  const [deleteClick, setDeleteClick] = useState(false);
  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    if (deleteClick) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            setDeleteClick(false);
            clearInterval(timer);
          }
          const diff = Math.random() * 60;
          return Math.min(oldProgress + diff, 100);
        });
      }, 500);
      return () => {
        setDeleteTask(true);
      };
    }
  }, [deleteClick, setDeleteClick, setDeleteTask]);

  const deleteTask = (task_id) => {
    setDeleteClick(true);
    TaskService.deleteTask(task_id);
  };
  return (
    <>
      {deleteClick === true ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      ) : null}

      <Draggable key={item.id} index={index} draggableId={item.id}>
        {(provided) => {
          return (
            <div ref={provided.innerRef} {...provided.draggableProps}>
              <div className="task-content border">
                {item.name}
                <span {...provided.dragHandleProps}>
                  {isEdit === true ? (
                    <RemoveIcon
                      sx={{ fontSize: 20, cursor: "pointer" }}
                      color="inherit"
                      onClick={() => deleteTask(item.id)}
                    />
                  ) : (
                    <MenuIcon sx={{ fontSize: 20 }} color="inherit" />
                  )}
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
