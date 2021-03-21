import React from "react";
import styles from "./TodoItem.module.css";
export default function TodoItem({
  title,
  body,
  status,
  handleToggle,
  handleDelete,
  id,
  handleEdit,
  updated,
}) {
  let myClass = "";
  if (status) {
    myClass = styles.todoToggle;
  }
  return (
    <div onClick={() => handleToggle(id)} className={styles.todoItem}>
      <p className={styles.todoTitle + " " + myClass}>{title}</p>
      <p className={styles.todoBody + " " + myClass}>
        {body}
        {updated && <span> (Updated)</span>}
      </p>
      <button onClick={(event) => handleEdit(id, event)}>Edit</button>
      <button
        className={styles.deleteTodo}
        onClick={(event) => handleDelete(id, event)}
      >
        Delete
      </button>
    </div>
  );
}
