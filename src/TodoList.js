import React from "react";
import TodoListItem from "./TodoListItem";

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
        return <TodoListItem key={item.id} todo={item} />;
      })}
    </ul>
  );
}

export default TodoList;
