import React from "react";
import style from "./TodoListItem.module.css";
import { ReactComponent as Delete } from "./delete.svg";

function TodoListItem({ todo, onRemoveTodo }) {
  return (
    <li className={style.ListItem}>
      {todo.fields.Title}
      <button
        onClick={() => onRemoveTodo(todo.id)}
        style={{ marginLeft: "5px" }}
        className={style.button}
      >
        <Delete height="23px" width="23px" stroke="#ffffff" />
      </button>
    </li>
  );
}

export default TodoListItem;
