import React from "react";

const todoList = [
  {
    id: "1",
    title: "Attend mentor session",
  },
  {
    id: "2",
    title: "Read",
  },
  {
    id: "3",
    title: "Complete assignment",
  },
];

function App() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Todo List</h1>
      <ul>
        {todoList.map(function (item) {
          return <li key={item.id}>{item.title}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
