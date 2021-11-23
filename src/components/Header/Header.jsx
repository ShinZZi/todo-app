import React from "react";
import { Stack, Button } from "@mui/material/";
import "./Header.css";

function Header(props) {
  const { setIsAdd } = props;
  return (
    <>
      <header className="header">
        <div className="header__logo">TodoApp</div>
        <div className="header__nav">
          <Stack spacing={2} direction="row">
            <Button
              style={{
                fontSize: "1.3rem",
                fontFamily: "Poppins",
                backgroundColor: "#959ea7",
              }}
              variant="contained"
              onClick={() => setIsAdd(true)}
            >
              <i className="fas fa-plus icon"></i>
              New Task
            </Button>
          </Stack>
        </div>
        <div className="header__ulties">
          <div className="header__ulties-tag">
            <a href="/" onClick={() => sessionStorage.clear()}>
              <i className="fas fa-sign-out-alt icon"></i>Logout
            </a>
          </div>
          <div className="header__ulties-user">
            <img src="./assets/img/avatar.jpg" alt="user-avt" />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
