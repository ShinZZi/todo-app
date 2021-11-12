import React from "react";
import "./Header.css";

function Header() {
  return (
    <>
      <header className="header">
        <div className="header__logo">TodoAPP</div>
        {/* Header Nav  */}
        <div className="header__nav">
          <form className="formAdd" action="" method="">
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Add new task. . ."
            />
            <button type="submit" className="btn btn-primary">
              <i className="fas fa-plus"></i>
            </button>
          </form>
        </div>
        {/* /Header Nav */}

        <div className="header__ulties">
          <div className="header__ulties-tag">
            <a href="/">
              <i className="fas fa-sign-out-alt icon"></i>Logout
            </a>
          </div>
          <div className="header__ulties-user">
            <img src="./assets/img/zpld7rxcb831.jpg" alt="user-avt" />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
