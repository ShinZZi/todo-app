import React, { useState, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Box, LinearProgress, TextField } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import MenuIcon from "@mui/icons-material/Menu";
import DoneIcon from "@mui/icons-material/Done";
import { TaskService } from "../../services/taskService";
import "./Task.css";

function Task(props) {
  const { item, index, isEdit, setIsDeleteTask, setIsUpdateTask } = props;
  const [deleteClick, setDeleteClick] = useState(false);
  const [progress, setProgress] = React.useState(0);
  const itemName = React.useRef();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    itemName.current = item.name;
    setInputValue(item.name);
  }, [item.name]);

  useEffect(() => {
    if (deleteClick) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            setDeleteClick(false);
            clearInterval(timer);
          }
          const diff = Math.random() * 80;
          return Math.min(oldProgress + diff, 100);
        });
      }, 500);
      return () => {
        setIsDeleteTask(true);
      };
    }
  }, [deleteClick, setDeleteClick, setIsDeleteTask]);

  const deleteTask = async (task) => {
    await TaskService.deleteTask(task.id);
    TaskService.getTaskByCardID(task.card_id).then((res) => {
      res.map(async (tsk, index) => {
        await TaskService.updateTask(tsk, index, task.card_id);
      });
    });
    setDeleteClick(true);
  };

  const updateTask = async (task, inputValue) => {
    task["name"] = inputValue;
    await TaskService.updateTask(task, task.index, task.card_id);
    itemName.current = inputValue;
    setIsUpdateTask(true);
    setInputValue(inputValue);
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
                {isEdit === true ? (
                  <TextField
                    id="textField"
                    variant="standard"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                ) : (
                  item.name
                )}
                {isEdit === true ? (
                  inputValue === itemName.current ? null : (
                    <DoneIcon
                      className="confirmChange"
                      sx={{ fontSize: 20, cursor: "pointer" }}
                      color="inherit"
                      onClick={() => updateTask(item, inputValue)}
                    />
                  )
                ) : null}

                <span className="dragElements" {...provided.dragHandleProps}>
                  {isEdit === true ? (
                    <RemoveIcon
                      sx={{ fontSize: 20, cursor: "pointer" }}
                      color="inherit"
                      onClick={() => deleteTask(item)}
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
