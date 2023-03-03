import React, { useCallback } from "react";
import AddTodoForm from "./AddTodoForm.js";
import TodoList from "./TodoList";
import style from "./TodoContainer.module.css";
import PropTypes from "prop-types";

const TodoContainer = ({ tableName }) => {
  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [sortOrderAlph, setSortOrderAlph] = React.useState("desc");
  const [sortOrderDate, setSortOrderDate] = React.useState("new");
  const [sortCriteria, setSortCriteria] = React.useState("byDate");

  const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableName}`;

  // Sort by title function
  const sortByTitle = useCallback(
    (list) => {
      if (sortOrderAlph === "asc") {
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
      } else if (sortOrderAlph === "desc") {
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
    [sortOrderAlph]
  );

  // Sort by date function
  const sortByDate = useCallback(
    (list) => {
      if (sortOrderDate === "new") {
        // Sorting in descending order by "Date" (new-to-old)
        list.sort((objectA, objectB) => {
          if (objectA.createdTime > objectB.createdTime) {
            return -1;
          } else if (objectA.createdTime < objectB.createdTime) {
            return 1;
          } else {
            return 0;
          }
        });
      } else if (sortOrderDate === "old") {
        // Sorting in ascending order by "Date" (old-to-new)
        list.sort((objectA, objectB) => {
          if (objectA.createdTime < objectB.createdTime) {
            return -1;
          } else if (objectA.createdTime > objectB.createdTime) {
            return 1;
          } else {
            return 0;
          }
        });
      }
    },
    [sortOrderDate]
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
        if (sortCriteria === "byDate") {
          sortByDate(result.records);
        } else {
          sortByTitle(result.records);
        }
        setTodoList(result.records);
        setIsLoading(false);
      });
  }, [url, sortByDate, sortByTitle, sortCriteria]);

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
        if (sortCriteria === "byDate") {
          sortByDate(updatedList);
        } else {
          sortByTitle(updatedList);
        }
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

  // Toggle button to sort by alphabet
  const toggleSortOrderAlph = () => {
    setSortOrderAlph(sortOrderAlph === "asc" ? "desc" : "asc");
    setSortCriteria("byTitle");
  };

  // Toggle button to sort by date
  const toggleSortOrderDate = () => {
    setSortOrderDate(sortOrderDate === "new" ? "old" : "new");
    setSortCriteria("byDate");
  };

  return (
    <div className={style.container}>
      <h1>{tableName}</h1>
      <AddTodoForm tableName={tableName} onAddTodo={addTodo} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <button onClick={toggleSortOrderAlph} className={style.toggleButton}>
            {sortOrderAlph === "asc" ? "Sort Z-A ▲" : "Sort A-Z ▼"}
          </button>
          <button onClick={toggleSortOrderDate} className={style.toggleButton}>
            {sortOrderDate === "new" ? "Old to New ▲" : "New to Old ▼"}
          </button>
          <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
        </>
      )}
    </div>
  );
};

TodoContainer.propTypes = {
  tableName: PropTypes.string,
};

export default TodoContainer;
