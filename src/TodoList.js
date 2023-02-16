import React from "react";
import TodoListItem from "./TodoListItem";
import style from "./TodoList.module.css";

function TodoList({ todoList, onRemoveTodo }) {
  return (
    <ul className={style.TodoList}>
      {todoList.map(function (todo) {
        return (
          <TodoListItem key={todo.id} todo={todo} onRemoveTodo={onRemoveTodo} />
        );
      })}
    </ul>
  );
}

export default TodoList;
