import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";

const App = () => {
  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(
      `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        },
      }
    )
      // new Promise((resolve, reject) => {
      //   setTimeout(() => {
      //     resolve({
      //       data: {
      //         todoList: JSON.parse(localStorage.getItem("savedTodoList")) || [],
      //       },
      //     });
      //   }, 2000);
      // })
      .then((response) => response.json())
      .then((result) => {
        setTodoList(result.records);
        setIsLoading(false);
      });
  }, []);

  React.useEffect(() => {
    if (isLoading === false) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  const removeTodo = (id) => {
    const newTodoList = todoList.filter((listItem) => listItem.id !== id);
    setTodoList(newTodoList);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <>
              <h1>Todo List</h1>
              <AddTodoForm onAddTodo={addTodo} />
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
              )}
            </>
          }
        ></Route>
        <Route path="/new" element={<h1>New Todo List</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
