import React from "react";
import styles from "./TodoInput.module.css";
export default function TodoInput({
  handleChange,
  id,
  title,
  body,
  handleClick,
}) {
  return (
    <div>
      <form onSubmit={(e) => handleClick(e, id)}>
        <input
          className={styles.inputTitle}
          onChange={handleChange}
          type="text"
          name="title"
          placeholder="Title..."
          value={title}
        />
        <input
          className={styles.inputBody}
          onChange={handleChange}
          type="text"
          name="body"
          placeholder="Add Task..."
          value={body}
        />
        {id ? (
          <button className={styles.addBtn}>Update</button>
        ) : (
          <button className={styles.addBtn}>Add</button>
        )}
      </form>
    </div>
  );
}
