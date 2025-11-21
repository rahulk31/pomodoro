import React, { useState, useEffect } from "react";
import "./addTask.css";
import { useTask } from "../../context/tasks-context";
import { validateTask } from "../../utils/helpers";
import { POMODORO_SETTINGS } from "../../constants/pomodoroSettings";

const AddTask = ({ closeModalHandler }) => {
  const initialValues = {
    title: "",
    description: "",
    duration: POMODORO_SETTINGS.FOCUS_DURATION.toString(),
    break: POMODORO_SETTINGS.SHORT_BREAK.toString(),
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { addTask } = useTask();

  const handleFormValues = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    const validation = validateTask(formValues);

    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    try {
      addTask({
        ...formValues,
        duration: Number(formValues.duration),
        break: Number(formValues.break),
      });
      closeModalHandler();
    } catch (error) {
      console.error("Error adding task:", error);
      setErrors({ submit: "Failed to add task. Please try again." });
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formValues.title?.trim() &&
    formValues.description?.trim() &&
    formValues.duration > 0 &&
    formValues.break >= 0;

  return (
    <div className="add-task-form">
      <h1 className="form-heading">New Task ✍️</h1>

      {errors.submit && <div className="error-banner">{errors.submit}</div>}

      <div className="input-field-container">
        <input
          name="title"
          id="title"
          type="text"
          className={`form-input ${errors.title ? "error" : ""}`}
          autoComplete="off"
          placeholder=" "
          value={formValues.title}
          onChange={handleFormValues}
          required
        />
        <label htmlFor="title" className="form-label">
          Task Name
        </label>
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="input-field-container">
        <textarea
          name="description"
          id="description"
          className={`form-input ${errors.description ? "error" : ""}`}
          autoComplete="off"
          value={formValues.description}
          onChange={handleFormValues}
          placeholder=" "
          rows="3"
          required
        />
        <label htmlFor="description" className="form-label">
          Description
        </label>
        {errors.description && (
          <span className="error-message">{errors.description}</span>
        )}
      </div>

      <div className="input-row">
        <div className="input-field-container">
          <input
            name="duration"
            id="duration"
            type="number"
            min="1"
            className={`form-input ${errors.duration ? "error" : ""}`}
            autoComplete="off"
            value={formValues.duration}
            onChange={handleFormValues}
            placeholder=" "
            required
          />
          <label htmlFor="duration" className="form-label">
            Work Time (min)
          </label>
          {errors.duration && (
            <span className="error-message">{errors.duration}</span>
          )}
        </div>

        <div className="input-field-container">
          <input
            name="break"
            id="break"
            type="number"
            min="0"
            className={`form-input ${errors.break ? "error" : ""}`}
            autoComplete="off"
            value={formValues.break}
            onChange={handleFormValues}
            placeholder=" "
            required
          />
          <label htmlFor="break" className="form-label">
            Break Time (min)
          </label>
          {errors.break && (
            <span className="error-message">{errors.break}</span>
          )}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="btn-close-modal"
        disabled={!isFormValid || isSubmitting}
      >
        {isSubmitting ? "Adding..." : "Add Task"}
      </button>
    </div>
  );
};

export default AddTask;
