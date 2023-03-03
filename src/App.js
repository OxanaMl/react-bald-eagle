import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoContainer from "./components/TodoContainer";
import Header from "./components/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" exact element={<h1>Home</h1>}></Route>
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
    </BrowserRouter>
  );
};

export default App;
