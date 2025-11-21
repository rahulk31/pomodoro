import React, { useState, useCallback } from "react";
import "./singleTask.css";
import {
  IoPlayOutline,
  IoStopOutline,
  IoRefreshOutline,
  IoPauseOutline,
} from "react-icons/io5";
import { useParams, useNavigate } from "react-router-dom";
import { useTask } from "../../context/tasks-context";
import { useTimer } from "../../hooks/useTimer";
import { TIMER_MODES } from "../../constants/pomodoroSettings";
import { padZero } from "../../utils/helpers";

const SingleTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { getTaskById } = useTask();
  const task = getTaskById(taskId);

  const [currentMode, setCurrentMode] = useState(TIMER_MODES.FOCUS);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  // Handle timer completion
  const handleTimerComplete = useCallback(() => {
    if (currentMode === TIMER_MODES.FOCUS) {
      setCompletedPomodoros((prev) => prev + 1);
    }
  }, [currentMode]);

  // Get duration based on current mode
  const getCurrentDuration = () => {
    if (currentMode === TIMER_MODES.FOCUS) {
      return Number(task?.duration || 25);
    } else {
      return Number(task?.break || 5);
    }
  };

  const timer = useTimer(getCurrentDuration(), handleTimerComplete);

  // Handle mode switching
  const handleModeSwitch = (mode) => {
    if (mode !== currentMode) {
      setCurrentMode(mode);
      timer.reset();
    }
  };

  // Handle back navigation
  const handleBack = () => {
    navigate("/tasks");
  };

  if (!task) {
    return (
      <div className="singletask-main">
        <div className="error-message">
          <h2>Task not found</h2>
          <button className="btn-mode" onClick={handleBack}>
            Back to Tasks
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="singletask-main">
      <div className="singletask-panel-left">
        <div className="heading">
          <h1>Timer ⏰</h1>
        </div>

        <div className="task-details-wrapper">
          <p className="task-heading">
            <span className="highlight-primary">Task: </span>
            {task.title}
          </p>
          <p className="task-description">
            <span className="highlight-primary">Description: </span>
            {task.description}
          </p>
          <p className="task-duration">
            <span className="highlight-primary">Work Time: </span>
            {task.duration} min
          </p>
          <p className="task-break">
            <span className="highlight-primary">Break Time: </span>
            {task.break} min
          </p>
          <p className="task-completed">
            <span className="highlight-primary">Completed: </span>
            {completedPomodoros} pomodoro{completedPomodoros !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="mode-cta">
          <button
            className={`btn-mode focus ${
              currentMode === TIMER_MODES.FOCUS ? "active" : ""
            }`}
            onClick={() => handleModeSwitch(TIMER_MODES.FOCUS)}
          >
            Focus
          </button>
          <button
            className={`btn-mode break ${
              currentMode !== TIMER_MODES.FOCUS ? "active" : ""
            }`}
            onClick={() => handleModeSwitch(TIMER_MODES.SHORT_BREAK)}
          >
            Break
          </button>
        </div>

        <button className="btn-back" onClick={handleBack}>
          ← Back to Tasks
        </button>
      </div>

      <div className="singletask-panel-right">
        <div className="timer-wrapper">
          <div className="timer-mode-indicator">
            <h3>
              {currentMode === TIMER_MODES.FOCUS ? "Focus Time" : "Break Time"}
            </h3>
          </div>

          <div className="timer">
            <h1 className="timer-text">
              {padZero(timer.minutes)}:{padZero(timer.seconds)}
            </h1>
          </div>

          {timer.isCompleted && (
            <div className="timer-complete-message">
              <p>
                Time's up!{" "}
                {currentMode === TIMER_MODES.FOCUS
                  ? "Take a break"
                  : "Back to work"}
                !
              </p>
            </div>
          )}

          <div className="timer-cta">
            {!timer.isRunning ? (
              <IoPlayOutline
                className="timer-icon play"
                onClick={timer.start}
                title="Start"
              />
            ) : (
              <IoPauseOutline
                className="timer-icon pause"
                onClick={timer.pause}
                title="Pause"
              />
            )}
            <IoStopOutline
              className="timer-icon stop"
              onClick={timer.reset}
              title="Stop"
            />
            <IoRefreshOutline
              className="timer-icon refresh"
              onClick={timer.reset}
              title="Reset"
            />
          </div>

          <div className="timer-status">
            <span className={`status-badge ${timer.status}`}>
              {timer.isRunning && "Running"}
              {timer.isPaused && "Paused"}
              {timer.isIdle && "Ready"}
              {timer.isCompleted && "Completed"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTask;
