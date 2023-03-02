import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoContainer from "./components/TodoContainer";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<TodoContainer />}></Route>
        <Route path="/new" element={<h1>New Todo List</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
