import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import TodoContainer from "./components/TodoContainer";
import Header from "./components/Header";
import style from "./App.module.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className={style.appContainer}>
        <div className={style.headerContainer}>
          <Header />
        </div>
        <div className={style.contentContainer}>
          <Routes>
            <Route path="/" exact element={<Home />}></Route>
            <Route
              path="/work"
              element={<TodoContainer tableName="Work" />}
            ></Route>
            <Route
              path="/studying"
              element={<TodoContainer tableName="Studying" />}
            ></Route>
            <Route
              path="/personal"
              element={<TodoContainer tableName="Personal" />}
            ></Route>
            <Route path="/new" element={<h1>New Todo List</h1>}></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
