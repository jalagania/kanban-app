import "./TaskFormModal.css";
import arrowUp from "../assets/icon-chevron-up.svg";
import arrowDown from "../assets/icon-chevron-down.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { cloneDeep } from "lodash";
import taskFormSlice from "../store/taskFormSlice";
import dataSlice from "../store/dataSlice";

function TaskFormModal() {
  const dispatch = useDispatch();
  const { setShowTaskFormModal } = taskFormSlice.actions;
  const { addTask, updateTask } = dataSlice.actions;
  const { taskInfo } = useSelector((store) => store.taskModal);
  const { taskFormModal } = useSelector((store) => store.taskFormModal);
  const { appData, selectedBoard } = useSelector((store) => store.data);

  const editing = taskFormModal === "edit";
  const task = editing
    ? appData
        .filter((board) => board.name === taskInfo.board)[0]
        .tasks.filter((task) => task.title === taskInfo.title)[0]
    : {
        title: "",
        description: "",
        status: "",
        subtasks: [{ title: "", isCompleted: false }],
      };
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [subtasks, setSubtasks] = useState(task.subtasks);
  const [taskStatus, setTaskStatus] = useState(task.status);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const wideScreen = window.innerHeight >= 900;
  const [error, setError] = useState(false);

  function formIsFilled(obj) {
    const myArr = [];
    const array = Object.values(obj).flat().slice();
    array.forEach((element) => {
      if (element.constructor.name === "Object") {
        myArr.push(...Object.values(element));
      } else {
        myArr.push(element);
      }
    });
    return !myArr.flat().includes("");
  }

  function handleTaskTitle(event) {
    setTaskTitle(event.target.value);
  }

  function handleTaskDescription(event) {
    setTaskDescription(event.target.value);
  }

  function handleSubtasks(event, index) {
    const array = cloneDeep(subtasks);
    array[index].title = event.target.value;
    setSubtasks(array);
  }

  function handleSubtaskDelete(index) {
    setSubtasks(subtasks.filter((sub, ind) => ind !== index));
  }

  function handleStatusMenu() {
    setShowStatusMenu(!showStatusMenu);
  }

  function handleTaskStatus(event) {
    setTaskStatus(event.target.textContent);
    setShowStatusMenu(false);
  }

  function handleAddSubtask() {
    setSubtasks([...subtasks, { title: "", isCompleted: false }]);
  }

  function handleFormSubmit() {
    const taskObj = {
      title: taskTitle,
      description: taskDescription,
      status: taskStatus,
      subtasks: subtasks,
    };
    if (formIsFilled(taskObj)) {
      if (editing) {
        dispatch(updateTask([taskObj, taskInfo]));
      } else {
        dispatch(addTask([taskObj, selectedBoard]));
      }
      setError(false);
      dispatch(setShowTaskFormModal([false]));
    } else {
      setError(true);
    }
  }

  useEffect(() => {
    function closeMenus(event) {
      if (
        !event.target.closest(".btn-tf-status-menu-head") &&
        !event.target.closest(".tf-status-menu-body")
      ) {
        setShowStatusMenu(false);
      }
    }

    document.addEventListener("click", closeMenus);

    return () => {
      document.removeEventListener("click", closeMenus);
    };
  }, []);

  return (
    <div className="task-form-container">
      <form className="task-form" onClick={(event) => event.preventDefault()}>
        <h2 className="task-form-title">{editing ? "Edit" : "Add New"} Task</h2>
        <label>
          <span>Title</span>
          <input
            type="text"
            placeholder="e.g. Take coffee break"
            value={taskTitle}
            onChange={handleTaskTitle}
          />
        </label>
        <label>
          <span>Description</span>
          <textarea
            placeholder="e.g. It's always good to take a break. This 15 minute break will 
            recharge the batteries a little."
            maxLength={150}
            value={taskDescription}
            onChange={handleTaskDescription}
          ></textarea>
        </label>
        <div className="task-form-subtasks-container">
          <span>Subtasks</span>
          <div className="task-form-subtasks">
            {subtasks.map((subtask, index) => {
              return (
                <div key={index} className="task-form-subtask-box">
                  <input
                    type="text"
                    placeholder="e.g. Make coffee"
                    maxLength={25}
                    value={subtask.title}
                    onChange={(event) => handleSubtasks(event, index)}
                  />
                  <button
                    type="button"
                    onClick={() => handleSubtaskDelete(index)}
                  >
                    <svg
                      width="15"
                      height="15"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fillRule="evenodd">
                        <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                        <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
                      </g>
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
          <button
            type="button"
            className="btn btn-add-form-subtask"
            onClick={handleAddSubtask}
          >
            + Add New Subtask
          </button>
        </div>
        <div className="task-form-status-menu">
          <h4>Status</h4>
          <button
            type="button"
            className={`btn-tf-status-menu-head ${
              showStatusMenu ? "active" : ""
            }`}
            onClick={handleStatusMenu}
          >
            <p>{taskStatus || "Select Status"}</p>
            <img
              src={wideScreen ? arrowDown : arrowUp}
              alt="arrow"
              className={showStatusMenu ? "rotate" : ""}
            />
          </button>
          <div
            className={`tf-status-menu-body ${wideScreen ? "menu-down" : ""}  ${
              showStatusMenu ? "" : "hidden"
            }`}
          >
            {appData
              .filter((board) => board.name === selectedBoard)[0]
              .columns.map((column, index) => {
                return (
                  <button type="button" key={index} onClick={handleTaskStatus}>
                    {column}
                  </button>
                );
              })}
          </div>
        </div>
        {error && <p className="error-text">All fields are mandatory</p>}
        <button
          type="submit"
          className="btn btn-form-create-task"
          onClick={handleFormSubmit}
        >
          {editing ? "Save Changes" : "Create Task"}
        </button>
      </form>
      <div
        className="task-form-bg"
        onClick={() => dispatch(setShowTaskFormModal([false]))}
      ></div>
    </div>
  );
}

export default TaskFormModal;
