import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Header.module.css";
import { ReactComponent as Home } from "../icons/home.svg";
import { ReactComponent as Work } from "../icons/work.svg";
import { ReactComponent as Studying } from "../icons/studying.svg";
import { ReactComponent as Personal } from "../icons/personal.svg";

const Header = () => {
  return (
    <div className={style.headerWrapper}>
      <div className={style.logo}>
        <h1>Todo List</h1>
      </div>
      <nav>
        <ul>
          <NavLink
            className={({ isActive }) =>
              `${style.link} ${isActive ? style.active : ""}`
            }
            exact="true"
            to="/"
          >
            <Home height="23px" width="23px" stroke="#ffffff" />
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${style.link} ${isActive ? style.active : ""}`
            }
            to="/work"
          >
            <Work height="23px" width="23px" stroke="#ffffff" />
            Work
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${style.link} ${isActive ? style.active : ""}`
            }
            to="/studying"
          >
            <Studying height="23px" width="23px" stroke="#ffffff" />
            Studying
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${style.link} ${isActive ? style.active : ""}`
            }
            to="/personal"
          >
            <Personal height="23px" width="23px" />
            Personal
          </NavLink>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
