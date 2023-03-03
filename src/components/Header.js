import React from "react";
import { Link } from "react-router-dom";
import style from "./Header.module.css";

const Header = () => {
  return (
    <div>
      <p>Todo List</p>
      <nav>
        <ul>
          <Link to="/" className={style.link}>
            Home
          </Link>
          <Link to="/work" className={style.link}>
            Work
          </Link>
          <Link to="/studying" className={style.link}>
            Studying
          </Link>
          <Link to="/personal" className={style.link}>
            Personal
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
