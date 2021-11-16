import React from "react";
import { Stack, Button } from "@mui/material/";
import "./Header.css";
import { Link } from "react-router-dom";

function Header(props) {
  const Logout = () => {
    sessionStorage.clear();
  };
  return (
    <>
      <header className="header">
        <div className="header__logo">TodoApp</div>
        {/* Header Nav  */}
        <div className="header__nav">
          <Stack spacing={2} direction="row">
            <Link style={{ textDecoration: "none" }} to="/main/add">
              <Button
                style={{
                  fontSize: "1.3rem",
                  fontFamily: "Poppins",
                  backgroundColor: "#959ea7",
                }}
                variant="contained"
              >
                <i className="fas fa-plus icon"></i>
                New Task
              </Button>
            </Link>
          </Stack>
        </div>
        {/* /Header Nav */}

        <div className="header__ulties">
          <div className="header__ulties-tag">
            <a href="/" onClick={Logout}>
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
