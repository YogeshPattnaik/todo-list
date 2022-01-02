import React from "react";
import logo from "../../assets/img/logo.jpg";
const Header = () => {
  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header d-flex">
          <a className="navbar-brand" href="#">
            <img alt="Brand" src={logo} width="40px" height="40px" />
          </a>
          <h2>Todo App</h2>
        </div>
      </div>
    </nav>
  );
};

export default Header;
