import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import style from "./App.module.css";

const App = () => {
  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [sortOrder, setSortOrder] = React.useState("asc");

  React.useEffect(() => {
    fetch(
      `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`,
      // Sorting with Airtable URL query parameters
      // `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default?view=Grid%20view&sort[0][field]=Title&sort[0][direction]=asc`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        if (sortOrder === "asc") {
          // Sorting in ascending alphabetical order by "Title" (A-to-Z)
          result.records.sort((objectA, objectB) => {
            if (objectA.fields.Title > objectB.fields.Title) {
              return 1;
            } else if (objectA.fields.Title < objectB.fields.Title) {
              return -1;
            } else {
              return 0;
            }
          });
        } else if (sortOrder === "desc") {
          // Sorting in descending alphabetical order by "Title" (A-to-Z)
          result.records.sort((objectA, objectB) => {
            if (objectA.fields.Title < objectB.fields.Title) {
              return 1;
            } else if (objectA.fields.Title > objectB.fields.Title) {
              return -1;
            } else {
              return 0;
            }
          });
        }

        setTodoList(result.records);
        setIsLoading(false);
      });
  }, [sortOrder]);

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

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <div className={style.container}>
              <h1>Todo List</h1>
              <AddTodoForm onAddTodo={addTodo} />
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <>
                  <button
                    onClick={toggleSortOrder}
                    className={style.toggleButton}
                  >
                    {sortOrder === "asc" ? "Sort Z-A" : "Sort A-Z"}
                  </button>
                  <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
                </>
              )}
            </div>
          }
        ></Route>
        <Route path="/new" element={<h1>New Todo List</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
