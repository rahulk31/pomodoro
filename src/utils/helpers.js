/**
 * Format time in MM:SS format
 * @param {number} totalSeconds - Total seconds to format
 * @returns {string} Formatted time string
 */
export const formatTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${padZero(minutes)}:${padZero(seconds)}`;
};

/**
 * Pad number with leading zero if less than 10
 * @param {number} num - Number to pad
 * @returns {string} Padded number string
 */
export const padZero = (num) => {
  return num < 10 ? `0${num}` : `${num}`;
};

/**
 * Convert minutes to seconds
 * @param {number} minutes - Minutes to convert
 * @returns {number} Total seconds
 */
export const minutesToSeconds = (minutes) => {
  return Number(minutes) * 60;
};

/**
 * Convert seconds to minutes
 * @param {number} seconds - Seconds to convert
 * @returns {number} Total minutes
 */
export const secondsToMinutes = (seconds) => {
  return Math.floor(seconds / 60);
};

/**
 * Generate unique ID
 * @returns {string} Unique ID
 */
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Validate task form data
 * @param {Object} task - Task object to validate
 * @returns {Object} Validation result with isValid and errors
 */
export const validateTask = (task) => {
  const errors = {};

  if (!task.title?.trim()) {
    errors.title = "Task name is required";
  }

  if (!task.description?.trim()) {
    errors.description = "Description is required";
  }

  if (!task.duration || task.duration <= 0) {
    errors.duration = "Work time must be greater than 0";
  }

  if (!task.break || task.break < 0) {
    errors.break = "Break time must be 0 or greater";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Play notification sound
 */
export const playNotificationSound = () => {
  const audio = new Audio(
    "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBDeH0fPTgjMGHm7A7+OZSA0PVK3n7a9gGAg+ltzy0n0pBSl+zPLaizsIGGS57OihUhELTKXh8bllHAU4kdfy0HwrBSh+zPPajjkIGGS56+mjUhELTKXh8bllHAU4kdfy0HwrBSh+zPPajjkIGGS56+mjUhELTKXh8bllHAU4kdfy0HwrBSh+zPPajjkIGGS56+mjUhELTKXh8bllHAU4kdfy0HwrBSh+zPPajjkIGGS56+mjUhELTKXh8bllHAU4kdfy0HwrBSh+zPPajjkIGGS56+mjUhELTKXh8bllHAU4kdfy0HwrBSh+zPPajjkIGGS56+mjUhELTKXh8bllHAU4kdfy0HwrBSh+zPPajjkIGGS56+mjUhELTKXh8bllHAU4kdfy0HwrBSh+zPPajjkIGGS56+mjUhELTKXh8bllHAU4kdfy0HwrBSh+zPPajjkIGGS56+mjUhELTKXh8bllHAU4kdfy0HwrBSh+zPPajjkIGGS56+mjUhELTKXh8bllHAU4kdfy0HwrBSh+zPPajjkIGGS56+mjUhELTKXh8bllHAU4kdfy0HwrBSh+zPPajjkIGGS56+mjUhELTKXh8bllHAU4kdfy0HwrBSh+zPPajjkIGGS56+mjUhELTKXh8bllHAU4kdfy0HwrBSh+zPPajjkIGGS56+mjUhELTKXh8bllHAU4kdfy0HwrBSh+zPPajjkIGGS56+mjUhELTKXh8bllHAU4kdf/2Jw="
  );
  audio.play().catch(() => {
    // Silently fail if audio playback is not allowed
  });
};
