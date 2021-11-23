import React, { useState, useEffect } from "react";
import { Alert, Stack } from "@mui/material/";
import { AuthService } from "../../services/authService";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router";

function Login() {
  const history = useNavigate();
  const [logSignOut, setLogSignOut] = useState(null);
  const [logSignIn, setLogSignIn] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // IF USER IS LOGGED IN
    if (sessionStorage.length) {
      axios.defaults.headers.common["x-access-token"] = JSON.parse(
        sessionStorage["user"]
      ).accessToken;
      // CHECK ACCESS TOKEN IS VALID OR NOT
      AuthService.authenticate().then((res) => {
        if (res.statusText === "OK") {
          history("/main");
        } else {
          sessionStorage.clear();
        }
      });
    }
  }, [history]);

  const Signup = async (e) => {
    e.preventDefault();
    let username = document.getElementById("typeUsernameX-1").value;
    let password = document.getElementById("typePasswordX-1").value;
    try {
      let response = await AuthService.signup(username, password);
      if (response.status === 200) {
        setLogSignOut("success");
      }
    } catch (error) {
      setLogSignOut("error");
      console.log(error.response);
    }
  };

  const Login = async (e) => {
    e.preventDefault();
    let username = document.getElementById("typeUsernameX-2").value;
    let password = document.getElementById("typePasswordX-2").value;
    try {
      let response = await AuthService.signin(username, password);
      if (response.status === 200) {
        axios.defaults.headers.common["x-access-token"] =
          response.data.accessToken;
        sessionStorage.setItem(
          "user",
          JSON.stringify({
            id: response.data.id,
            name: username,
            accessToken: response.data.accessToken,
          })
        );
        setLogSignIn("success");
        setTimeout(() => {
          setIsLoggedIn(true);
          history("/main");
        }, 1000);
      }
    } catch (error) {
      setLogSignIn("error");
      console.log(error.response);
    }
  };

  return (
    <>
      {isLoggedIn !== true ? (
        <div className="section">
          <div className="main">
            <input type="checkbox" id="chk" aria-hidden="true" defaultChecked />

            <div className="signup">
              <>
                <label htmlFor="chk" aria-hidden="true">
                  Sign up
                </label>
                {logSignOut === "error" ? (
                  <Stack sx={{ margin: "auto", width: "75%" }} spacing={2}>
                    <Alert sx={{ fontSize: "1.6rem" }} severity="error">
                      Register Fail !!
                    </Alert>
                  </Stack>
                ) : null}
                {logSignOut === "success" ? (
                  <Stack sx={{ margin: "auto", width: "75%" }} spacing={2}>
                    <Alert sx={{ fontSize: "1.6rem" }} severity="success">
                      Register Success.
                    </Alert>
                  </Stack>
                ) : null}
                <input
                  id="typeUsernameX-1"
                  type="text"
                  name="username"
                  placeholder="User name"
                  required=""
                />
                <input
                  id="typePasswordX-1"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required=""
                />
                <button onClick={(e) => Signup(e)}>Sign up</button>
              </>
            </div>

            <div className="login">
              <>
                <label htmlFor="chk" aria-hidden="true">
                  Login
                </label>
                {logSignIn === "error" ? (
                  <Stack sx={{ margin: "auto", width: "75%" }} spacing={2}>
                    <Alert sx={{ fontSize: "1.6rem" }} severity="error">
                      Login Fail !!
                    </Alert>
                  </Stack>
                ) : null}
                {logSignIn === "success" ? (
                  <Stack sx={{ margin: "auto", width: "75%" }} spacing={2}>
                    <Alert sx={{ fontSize: "1.6rem" }} severity="success">
                      Login Success.
                    </Alert>
                  </Stack>
                ) : null}
                <input
                  id="typeUsernameX-2"
                  type="text"
                  name="username"
                  placeholder="Username"
                  required=""
                />
                <input
                  id="typePasswordX-2"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required=""
                />
                <button onClick={(e) => Login(e)} type="submit">
                  Login
                </button>
              </>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Login;
