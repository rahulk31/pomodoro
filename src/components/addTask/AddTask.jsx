import React, { useState } from "react";
import { useEffect } from "react";
import "./addTask.css";

import { useTask } from "../../context/tasks-context";
import { useId } from "react";

const AddTask = ({ closeModalHandler }) => {
  const initialValues = {
    id: useId(),
    title: "",
    description: "",
    duration: "",
    break: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [disableBtn, setDisableBtn] = useState(true);

  const { tasksDB, setTasksDB } = useTask();

  const handleFormValues = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    !formValues.title ||
    !formValues.description ||
    !formValues.duration ||
    !formValues.break
      ? setDisableBtn(true)
      : setDisableBtn(false);
  }, [formValues]);

  const submitHandler = () => {
    setTasksDB([...tasksDB, formValues]);
    closeModalHandler();
  };

  return (
    <>
      <div className="add-task-form">
        <h1 className="form-heading">New Task ✍️</h1>

        <div className="input-field-container">
          <input
            name="title"
            id="title"
            type="text"
            className="form-input"
            autoComplete="off"
            placeholder=" "
            value={formValues.title}
            onChange={handleFormValues}
            required
          />
          <label htmlFor="title" className="form-label">
            Name
          </label>
        </div>
        <div className="input-field-container">
          <textarea
            name="description"
            id="desription"
            type="text"
            className="form-input"
            autoComplete="off"
            value={formValues.description}
            onChange={handleFormValues}
            placeholder=" "
            required
          />
          <label htmlFor="description" className="form-label">
            Description
          </label>
        </div>

        <div className="input-field-container">
          <input
            name="duration"
            id="duration"
            type="number"
            className="form-input"
            autoComplete="off"
            value={formValues.duration}
            onChange={handleFormValues}
            placeholder=" "
            required
          />
          <label htmlFor="duration" className="form-label">
            Work Time
          </label>
        </div>
        <div className="input-field-container">
          <input
            name="break"
            id="break"
            type="number"
            className="form-input"
            autoComplete="off"
            value={formValues.break}
            onChange={handleFormValues}
            placeholder=" "
            required
          />
          <label htmlFor="break" className="form-label">
            Break Time
          </label>
        </div>

        {disableBtn ? (
          <button className="btn-close-modal btn-close-modal-disabled" disabled>
            Add
          </button>
        ) : (
          <button onClick={submitHandler} className="btn-close-modal">
            Add
          </button>
        )}
      </div>
    </>
  );
};

export default AddTask;
