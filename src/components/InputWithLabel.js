import React from "react";
import style from "./InputWithLabel.module.css";
import PropTypes from "prop-types";

const InputWithLabel = ({ todoTitle, handleTitleChange, children }) => {
  const inputRef = React.useRef();
  React.useEffect(() => {
    inputRef.current.focus();
  });
  return (
    <>
      <label htmlFor="todoTitle">{children} </label>
      <input
        type="text"
        id="todoTitle"
        name="title"
        value={todoTitle}
        onChange={handleTitleChange}
        ref={inputRef}
        className={style.InputWithLabel}
      ></input>
    </>
  );
};

InputWithLabel.propTypes = {
  todoTitle: PropTypes.string,
  handleTitleChange: PropTypes.func,
  children: PropTypes.string,
};

export default InputWithLabel;
