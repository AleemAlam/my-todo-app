import React from "react";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import styles from "./Todo.module.css";
import { v4 as uuid } from "uuid";

const formData = {
  title: "",
  body: "",
  status: false,
};

function Todo() {
  const [data, setData] = React.useState(formData);
  const [task, setTask] = React.useState([]);
  const [showCompleted, setShowCompleted] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleClick = (e, id = 0) => {
    e.preventDefault();

    let payload;
    if (id !== 0) {
      payload = {
        ...data,
      };
    } else {
      payload = {
        ...data,
        id: uuid(),
      };
    }
    setTask([...task, payload]);
    setData(formData);
  };

  const handleToggle = (id) => {
    const updatedTodo = task.map((todo) =>
      todo.id === id ? { ...todo, status: !todo.status } : { ...todo }
    );
    setTask(updatedTodo);
  };
  const handleDelete = (id, event) => {
    event.stopPropagation();
    const updatedTodo = task.filter((todo) => todo.id !== id);
    setTask(updatedTodo);
  };
  const handleEdit = (id, event) => {
    event.stopPropagation();
    const { title, body, status, id: myId } = task.filter(
      (todo) => todo.id === id
    )[0];
    setData({
      title: title,
      body: body,
      status: status,
      id: myId,
    });
    handleDelete(id, event);
  };
  return (
    <div className={styles.container}>
      <TodoInput
        handleChange={handleChange}
        handleClick={handleClick}
        {...data}
      />
      {task
        .filter((item) => !item.status)
        .map((item) => (
          <TodoItem
            key={item.id}
            handleEdit={handleEdit}
            handleToggle={handleToggle}
            handleDelete={handleDelete}
            {...item}
          />
        ))}
      {task.filter((item) => item.status).length > 0 && (
        <div>
          <button
            className={styles.showCompleteBtn}
            onClick={() => setShowCompleted((status) => !status)}
          >
            {showCompleted ? "Hide" : "Show"} Completed Task
          </button>
          {showCompleted &&
            task
              .filter((item) => item.status)
              .map((item) => (
                <TodoItem
                  key={item.id}
                  handleEdit={handleEdit}
                  handleToggle={handleToggle}
                  handleDelete={handleDelete}
                  {...item}
                />
              ))}
        </div>
      )}
    </div>
  );
}

export { Todo };
