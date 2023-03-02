import React, { useCallback } from "react";
import AddTodoForm from "./AddTodoForm.js";
import TodoList from "./TodoList";
import style from "./TodoContainer.module.css";

const TodoContainer = () => {
  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [sortOrder, setSortOrder] = React.useState("asc");

  const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`;

  const sortByTitle = useCallback(
    (list) => {
      if (sortOrder === "asc") {
        // Sorting in ascending alphabetical order by "Title" (A-to-Z)
        list.sort((objectA, objectB) => {
          if (
            objectA.fields.Title.toLowerCase() >
            objectB.fields.Title.toLowerCase()
          ) {
            return 1;
          } else if (
            objectA.fields.Title.toLowerCase() <
            objectB.fields.Title.toLowerCase()
          ) {
            return -1;
          } else {
            return 0;
          }
        });
      } else if (sortOrder === "desc") {
        // Sorting in descending alphabetical order by "Title" (Z-to-A)
        list.sort((objectA, objectB) => {
          if (
            objectA.fields.Title.toLowerCase() <
            objectB.fields.Title.toLowerCase()
          ) {
            return 1;
          } else if (
            objectA.fields.Title.toLowerCase() >
            objectB.fields.Title.toLowerCase()
          ) {
            return -1;
          } else {
            return 0;
          }
        });
      }
    },
    [sortOrder]
  );

  // GET data from Airtable
  React.useEffect(() => {
    fetch(
      url,
      // Sorting with Airtable URL query parameters
      // `${url}?view=Grid%20view&sort[0][field]=Title&sort[0][direction]=asc`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        sortByTitle(result.records);
        setTodoList(result.records);
        setIsLoading(false);
      });
  }, [url, sortByTitle]);

  React.useEffect(() => {
    if (isLoading === false) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  // POST data to Airtable
  const addTodo = (newTodo) => {
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          Title: newTodo.fields.Title,
        },
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        let updatedList = [...todoList, result];
        sortByTitle(updatedList);
        setTodoList(updatedList);
      });
  };

  // DELETE data from Airtable
  const removeTodo = (id) => {
    fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      },
    }).then((response) => response.json());

    const newTodoList = todoList.filter((listItem) => listItem.id !== id);
    setTodoList(newTodoList);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className={style.container}>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <button onClick={toggleSortOrder} className={style.toggleButton}>
            {sortOrder === "asc" ? "Sort Z-A" : "Sort A-Z"}
          </button>
          <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
        </>
      )}
    </div>
  );
};

export default TodoContainer;
