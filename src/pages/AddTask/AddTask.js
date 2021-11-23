import React, { useState } from "react";
import { Stack, Button, Alert } from "@mui/material";
import { TaskService } from "../../services/taskService";
import "./AddTask.css";

function AddTask(props) {
  const { setIsAdd } = props;
  const [logAdd, setLogAdd] = useState(null);

  const createNewTask = async (e) => {
    e.preventDefault();
    const user = JSON.parse(sessionStorage["user"]);
    let taskName = document.getElementById("FormControlInput").value;
    try {
      let result = await TaskService.createNewTask(user.id, taskName);
      if (result.statusText === "OK") {
        setLogAdd("success");
        setTimeout(() => {
          setIsAdd(false);
        }, 1000);
      }
    } catch (error) {
      setLogAdd("error");
      console.log(error);
    }
  };
  return (
    <div className="AddTask">
      <div className="form">
        <Stack spacing={2} direction="row">
          <Button
            style={{
              marginBottom: "2rem",
              fontSize: "1.3rem",
              fontFamily: "Poppins",
              backgroundColor: "#959ea7",
            }}
            variant="contained"
            onClick={() => setIsAdd(false)}
          >
            <i className="fas fa-chevron-left icon"></i>
            BACK
          </Button>
        </Stack>
        {logAdd === "success" ? (
          <Stack sx={{ marginBottom: "1.5rem", width: "100%" }} spacing={2}>
            <Alert sx={{ fontSize: "1.6rem" }} severity="success">
              Add Success.
            </Alert>
          </Stack>
        ) : null}
        {logAdd === "error" ? (
          <Stack sx={{ marginBottom: "1.5rem", width: "100%" }} spacing={2}>
            <Alert sx={{ fontSize: "1.6rem" }} severity="error">
              Add Unsuccess.
            </Alert>
          </Stack>
        ) : null}
        <div className="mb-5">
          <label htmlFor="FormControlInput" className="form-label">
            Task Name
          </label>
          <input
            type="text"
            className="form-control"
            id="FormControlInput"
            placeholder="example: Do Homework . . ."
          />
        </div>
        <div className="mb-3 submit">
          <Stack direction="row" spacing={2}>
            <Button
              onClick={createNewTask}
              style={{
                width: "15rem",
                fontFamily: "Poppins",
                fontSize: "1.1rem",
              }}
              size="large"
              variant="outlined"
            >
              Add New
            </Button>
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default AddTask;
