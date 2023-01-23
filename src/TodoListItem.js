import React from "react";

function TodoListItem({ todo, onRemoveTodo }) {
  return (
    <li>
      {todo.fields.Title}
      <button
        onClick={() => onRemoveTodo(todo.id)}
        style={{ marginLeft: "5px" }}
      >
        Remove
      </button>
    </li>
  );
}

export default TodoListItem;
