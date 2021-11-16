import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../services/userService";
import { Alert, Stack } from "@mui/material/";

function Login() {
  const history = useNavigate();
  const [logs, setLogs] = useState("");

  useEffect(() => {
    if (sessionStorage.length) {
      let user = JSON.parse(sessionStorage["user"]);
      UserService.getUser(user.name).then((response) => {
        if (
          response !== undefined &&
          response.name === user.name &&
          response.password === user.password
        ) {
          setLogs("success");
          sessionStorage.setItem(
            "user",
            JSON.stringify({
              id: response.id,
              name: response.name,
              password: response.password,
            })
          );
          setTimeout(() => {
            return history("/main");
          }, 1000);
        } else {
          setLogs("error");
          sessionStorage.clear();
        }
      });
    }
  }, [history, logs]);

  const Login = () => {
    let name = document.getElementById("typeUsernameX-2").value;
    let password = document.getElementById("typePasswordX-2").value;
    sessionStorage.setItem(
      "user",
      JSON.stringify({ name: name, password: password })
    );
    setLogs("pending");
  };

  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#2C3E50" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card shadow-2-strong"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <h3 className="mb-5">Sign in</h3>
                  {logs === "error" ? (
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Alert sx={{ fontSize: "1.6rem" }} severity="error">
                        Login Fail !!
                      </Alert>
                    </Stack>
                  ) : null}
                  {logs === "success" ? (
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Alert sx={{ fontSize: "1.6rem" }} severity="success">
                        Login Success.
                      </Alert>
                    </Stack>
                  ) : null}
                  <div className="form-outline mt-4 mb-4">
                    <label className="form-label" htmlFor="typeUsernameX-2">
                      Username
                    </label>
                    <input
                      type="text"
                      id="typeUsernameX-2"
                      className="form-control form-control-lg"
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <label
                      style={{ textAlign: "left" }}
                      className="form-label"
                      htmlFor="typePasswordX-2"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="typePasswordX-2"
                      className="form-control form-control-lg"
                    />
                  </div>
                  <button
                    className="btn btn-primary btn-lg btn-block"
                    type="submit"
                    onClick={Login}
                  >
                    Login
                  </button>
                  <hr className="my-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
