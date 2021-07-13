import React, { useState } from "react";
import { Link } from "react-router-dom"; //ссылка без перезагруки
//import Auth from "./auth";
import "./Header.css";
const Header = () => {
  return (
    <header>
      <div className="card">
        <Link to="/">Все товары</Link>
      </div>
      <div className="card">
        <Link to="/category/pod">Под системы</Link>
      </div>
      <div className="card">
        <Link to="/category/elektronnye-sigarety">Устройства</Link>
      </div>

      <div className="card">
        <Link to="/category/juicy">Солевые жидкости</Link>
      </div>
      <div className="card">
        <Link to="/category/atomajzery">Атомайзеры</Link>
      </div>
      <div className="card">
        <Link to="/category/component">Комплектующие</Link>
      </div>
      <div className="card">{/* <Auth /> */}</div>
    </header>
  );
};

export default Header;
