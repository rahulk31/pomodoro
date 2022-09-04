import React from "react";
import "./singleTask.css";
import {
  IoPlayOutline,
  IoStopOutline,
  IoRefreshOutline,
} from "react-icons/io5";

import { useParams } from "react-router-dom";
import { useTask } from "../../context/tasks-context";

const SingleTask = () => {
  const { taskId } = useParams();
  const { tasksDB } = useTask();

  const task = tasksDB.filter((task) => task.id === taskId);
  console.log(task);
  return (
    <>
      <div className="singletask-main">
        <div className="singletask-panel-left">
          <div className="heading">
            <h1>Timer ⏰</h1>
          </div>

          <div className="task-details-wrapper">
            <p className="task-heading">
              <span className="highlight-primary">Task name: </span>
              {task[0].title}
            </p>
            <p className="task-desription">
              <span className="highlight-primary">Description: </span>
              {task[0].description}
            </p>
            <p className="task-duration">
              <span className="highlight-primary">Duration: </span>
              {task[0].duration}
            </p>
            <p className="task-break">
              <span className="highlight-primary">Break: </span>
              {task[0].break}
            </p>
          </div>
          <div className="mode-cta">
            <button className="btn-mode focus">Focus</button>
            <button className="btn-mode break">Break</button>
          </div>
        </div>

        {/* // Right Panel */}
        <div className="singletask-panel-right">
          <div className="timer-wrapper">
            <div className="timer">
              <h1 className="timer-text">67:00</h1>
            </div>
            <div className="timer-cta">
              <IoPlayOutline className="timer-icon" />
              <IoStopOutline className="timer-icon" />
              <IoRefreshOutline className="timer-icon" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleTask;
