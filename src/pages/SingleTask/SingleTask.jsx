import React from "react";
import "./singleTask.css";
import {
  IoPlayOutline,
  IoStopOutline,
  IoRefreshOutline,
} from "react-icons/io5";

import { useParams } from "react-router-dom";
import { useTask } from "../../context/tasks-context";
import { useState, useEffect, useRef } from "react";

const SingleTask = () => {
  const { taskId } = useParams();
  const { tasksDB } = useTask();

  const task = tasksDB.filter((task) => task.id === taskId);
  const [minutes, setMinutes] = useState(Number(task[0].duration));
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            setMinutes((prevMinutes) => {
              if (prevMinutes === 0) {
                clearInterval(timerRef.current);
                setIsRunning(false);
                return 0;
              }
              return prevMinutes - 1;
            });
            return 59;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);

  const playTimerHandler = () => {
    setIsRunning(true);
  };

  const stopTimerHandler = () => {
    setIsRunning(false);
  };

  const rewindTimerHandler = () => {
    setIsRunning(false);
    setMinutes(Number(task[0].duration));
    setSeconds(0);
  };

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
              <h1 className="timer-text">
                {minutes < 10 ? "0" + minutes : minutes} :{" "}
                {seconds < 10 ? "0" + seconds : seconds}
              </h1>
            </div>
            <div className="timer-cta">
              <IoPlayOutline
                className="timer-icon"
                onClick={playTimerHandler}
              />
              <IoStopOutline
                className="timer-icon"
                onClick={stopTimerHandler}
              />
              <IoRefreshOutline
                className="timer-icon"
                onClick={rewindTimerHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleTask;
