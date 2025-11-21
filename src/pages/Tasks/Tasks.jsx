import React, { useState } from "react";
import "./tasks.css";
import { IoAddOutline, IoCloseOutline } from "react-icons/io5";
import AddTask from "../../components/addTask/AddTask";
import TaskRow from "../../components/taskRow/TaskRow";
import { useTask } from "../../context/tasks-context";

const Tasks = () => {
  const [addTaskModal, setAddTaskModal] = useState(false);
  const { tasks } = useTask();

  const openModalHandler = () => {
    setAddTaskModal(true);
  };

  const closeModalHandler = () => {
    setAddTaskModal(false);
  };

  return (
    <div className="tasks-main">
      <div className="tasks-panel-left">
        <div className="greeting">
          <h1>Hello There 👋</h1>
        </div>

        <p>Add tasks to work on today.</p>

        <div className="quote-of-the-day">
          <h3 className="quote-title">Quote of the day 👇</h3>
          <p className="quote">
            Success is the sum of small efforts put together day in and out.
          </p>
        </div>
      </div>

      <div className="tasks-panel-right">
        <div className="greeting">
          <h1>Tasks 📌</h1>
        </div>

        {tasks.length !== 0 ? (
          <div className="task-wrapper">
            {tasks.map((task) => (
              <TaskRow key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <p className="no-tasks-message">
            No tasks to display, go ahead and add one 🤘
          </p>
        )}

        <div className="add-task-div">
          {addTaskModal && <AddTask closeModalHandler={closeModalHandler} />}
          {addTaskModal ? (
            <IoCloseOutline className="add-task" onClick={closeModalHandler} />
          ) : (
            <IoAddOutline className="add-task" onClick={openModalHandler} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
