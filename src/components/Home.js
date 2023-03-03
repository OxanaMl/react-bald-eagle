import React from "react";
import style from "./Home.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className={style.homeContainer}>
      <h1>Welcome to Todo List App!</h1>
      <p>
        Stay on top of your tasks and organize your life by adding todos into
        the categories on the left, and checking them off as you complete them.
      </p>
      <Link className={style.getStartedButton} to="/work">
        &#x2B05; Get Started
      </Link>
    </div>
  );
};

export default Home;
