import React from "react";

function TodoListItem(props) {
  //   console.log(`This is props:`, props);
  return <li>{props.todo.title}</li>;
}

export default TodoListItem;
