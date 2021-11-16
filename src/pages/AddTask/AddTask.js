import React, { useRef, useState } from "react";
import { Stack, Button, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { TaskService } from "../../services/taskService";
import "./AddTask.css";

function AddTask() {
  const history = useNavigate();
  const [logs, setLogs] = useState(null);
  const usr = useRef(JSON.parse(sessionStorage["user"]));

  const createNewTask = async (e) => {
    e.preventDefault();
    let taskName = document.getElementById("FormControlInput").value;
    let status = await TaskService.createNewTask(usr.current.id, taskName);
    if (status === 200) {
      setLogs("success");
      setTimeout(() => {
        return history("/main");
      }, 1000);
    }
  };
  return (
    <div className="AddTask">
      <div className="form">
        <Stack spacing={2} direction="row">
          <Link style={{ textDecoration: "none" }} to="/main">
            <Button
              style={{
                marginBottom: "2rem",
                fontSize: "1.3rem",
                fontFamily: "Poppins",
                backgroundColor: "#959ea7",
              }}
              variant="contained"
            >
              <i className="fas fa-chevron-left icon"></i>
              BACK
            </Button>
          </Link>
        </Stack>
        {logs === "success" ? (
          <Stack sx={{ marginBottom: "1.5rem", width: "100%" }} spacing={2}>
            <Alert sx={{ fontSize: "1.6rem" }} severity="success">
              Add Success.
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
              style={{ width: "15rem" }}
              size="large"
              variant="outlined"
            >
              Add Now
            </Button>
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default AddTask;
