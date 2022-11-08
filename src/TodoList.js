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

function TodoList() {
  return (
    <ul>
      {todoList.map(function (item) {
        return <li key={item.id}>{item.title}</li>;
      })}
    </ul>
  );
}

export default TodoList;
