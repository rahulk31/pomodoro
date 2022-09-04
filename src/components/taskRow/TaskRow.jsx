import React from "react";
import "./taskRow.css";
import {
  IoReorderTwoOutline,
  IoTimeOutline,
  IoPencil,
  IoTrashOutline,
} from "react-icons/io5";
import { useTask } from "../../context/tasks-context";
import { Link } from "react-router-dom";

const TaskRow = ({ task }) => {
  const { tasksDB, setTasksDB } = useTask();

  const deleteTaskHandler = (id) => {
    setTasksDB(tasksDB.filter((task) => task.id !== id));
  };

  return (
    <>
      <div className="taskrow-wrapper">
        <div className="taskrow-left">
          <IoReorderTwoOutline className="taskrow-icon" />
          <p>{task.title}</p>
        </div>
        <div className="taskrow-right">
          <Link to={`/task/${task.id}`}>
            <IoTimeOutline className="taskrow-icon" />
          </Link>
          <IoPencil className="taskrow-icon" />
          <IoTrashOutline
            className="taskrow-icon"
            onClick={() => deleteTaskHandler(task.id)}
          />
        </div>
      </div>
    </>
  );
};

export default TaskRow;
