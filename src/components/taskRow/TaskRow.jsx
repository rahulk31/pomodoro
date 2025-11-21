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
  const { deleteTask } = useTask();

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
      deleteTask(task.id);
    }
  };

  return (
    <div className="taskrow-wrapper">
      <div className="taskrow-left">
        <IoReorderTwoOutline className="taskrow-icon drag-handle" />
        <div className="task-info">
          <p className="task-title">{task.title}</p>
          <p className="task-meta">
            {task.duration}min work · {task.break}min break
          </p>
        </div>
      </div>
      <div className="taskrow-right">
        <Link to={`/task/${task.id}`} title="Start Timer">
          <IoTimeOutline className="taskrow-icon timer-icon" />
        </Link>
        <IoPencil className="taskrow-icon edit-icon" title="Edit Task" />
        <IoTrashOutline
          className="taskrow-icon delete-icon"
          onClick={handleDelete}
          title="Delete Task"
        />
      </div>
    </div>
  );
};

export default TaskRow;
