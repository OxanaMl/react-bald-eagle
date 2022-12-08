import React from "react";

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
      ></input>
    </>
  );
};

export default InputWithLabel;
