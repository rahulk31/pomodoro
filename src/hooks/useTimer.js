import { useState, useEffect, useRef, useCallback } from "react";
import { TIMER_STATUS } from "../constants/pomodoroSettings";
import { minutesToSeconds, playNotificationSound } from "../utils/helpers";

/**
 * Custom hook for managing timer logic
 * @param {number} initialMinutes - Initial timer duration in minutes
 * @param {Function} onComplete - Callback function when timer completes
 * @returns {Object} Timer state and controls
 */
export const useTimer = (initialMinutes, onComplete) => {
  const [totalSeconds, setTotalSeconds] = useState(
    minutesToSeconds(initialMinutes)
  );
  const [status, setStatus] = useState(TIMER_STATUS.IDLE);
  const timerRef = useRef(null);

  // Calculate minutes and seconds from total seconds
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Start timer
  const start = useCallback(() => {
    if (totalSeconds > 0) {
      setStatus(TIMER_STATUS.RUNNING);
    }
  }, [totalSeconds]);

  // Pause timer
  const pause = useCallback(() => {
    setStatus(TIMER_STATUS.PAUSED);
  }, []);

  // Reset timer
  const reset = useCallback(() => {
    setStatus(TIMER_STATUS.IDLE);
    setTotalSeconds(minutesToSeconds(initialMinutes));
  }, [initialMinutes]);

  // Skip to end
  const skip = useCallback(() => {
    setStatus(TIMER_STATUS.COMPLETED);
    setTotalSeconds(0);
  }, []);

  // Timer effect
  useEffect(() => {
    if (status === TIMER_STATUS.RUNNING && totalSeconds > 0) {
      timerRef.current = setInterval(() => {
        setTotalSeconds((prev) => {
          if (prev <= 1) {
            setStatus(TIMER_STATUS.COMPLETED);
            playNotificationSound();
            if (onComplete) {
              onComplete();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [status, totalSeconds, onComplete]);

  // Update total seconds when initial minutes change
  useEffect(() => {
    if (status === TIMER_STATUS.IDLE) {
      setTotalSeconds(minutesToSeconds(initialMinutes));
    }
  }, [initialMinutes, status]);

  return {
    minutes,
    seconds,
    totalSeconds,
    status,
    isRunning: status === TIMER_STATUS.RUNNING,
    isPaused: status === TIMER_STATUS.PAUSED,
    isCompleted: status === TIMER_STATUS.COMPLETED,
    isIdle: status === TIMER_STATUS.IDLE,
    start,
    pause,
    reset,
    skip,
  };
};
