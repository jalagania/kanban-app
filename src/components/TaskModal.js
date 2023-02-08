import "./TaskModal.css";
import ellipsis from "../assets/icon-vertical-ellipsis.svg";
import check from "../assets/icon-check.svg";
import arrowDown from "../assets/icon-chevron-down.svg";
import arrowUp from "../assets/icon-chevron-up.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import taskModalSlice from "../store/taskModalSlice";

// import taskModalSlice from "../store/taskModalSlice";
// import dataSlice from "../store/dataSlice";

function TaskModal() {
  const dispatch = useDispatch();
  const { appData } = useSelector((store) => store.data);
  const { taskInfo } = useSelector((store) => store.taskModal);
  const task = appData
    .filter((board) => board.name === taskInfo.board)[0]
    .columns.filter((column) => column.name === taskInfo.column)[0].tasks[
    taskInfo.index
  ];

  const { setShowTaskModal } = taskModalSlice.actions;
  const [showModalButtons, setShowModalButtons] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const wideScreen = window.innerHeight >= 900;

  function handelEllipsisButton() {
    setShowModalButtons(!showModalButtons);
  }

  function handleStatusMenu() {
    setShowStatusMenu(!showStatusMenu);
  }

  useEffect(() => {
    function closeMenus(event) {
      if (
        !event.target.closest(".btn-tm-ellipsis") &&
        !event.target.closest(".task-modal-buttons") &&
        !event.target.closest(".task-modal-status-menu")
      ) {
        setShowModalButtons(false);
        setShowStatusMenu(false);
      }
    }

    document.addEventListener("click", closeMenus);

    return () => {
      document.removeEventListener("click", closeMenus);
    };
  }, []);

  return (
    <div className="task-modal-container">
      <div className="task-modal-window">
        <div className="task-modal-header">
          <h2>{task.title}</h2>
          <button className="btn-tm-ellipsis" onClick={handelEllipsisButton}>
            <img src={ellipsis} alt="ellipsis icon" />
          </button>
          <div
            className={`task-modal-buttons ${showModalButtons ? "" : "hidden"}`}
          >
            <button className="btn-task-modal-edit">Edit Task</button>
            <button className="btn-task-modal-delete">Delete Task</button>
          </div>
        </div>
        <p className="task-modal-text">{task.description}</p>
        <h4>
          Subtasks (
          {task.subtasks.filter((sub) => sub.isCompleted === true).length} of{" "}
          {task.subtasks.length})
        </h4>
        <div className="task-modal-subtasks">
          {task.subtasks.map((sub, index) => {
            return (
              <div key={index} className="task-modal-subtask">
                <div
                  className={`check-box ${sub.isCompleted ? "checked" : ""}`}
                >
                  <img
                    src={check}
                    alt="check icon"
                    className={sub.isCompleted ? "" : "hidden"}
                  />
                </div>
                <p className={sub.isCompleted ? "completed" : ""}>
                  {sub.title}
                </p>
              </div>
            );
          })}
        </div>
        <h4>Current Status</h4>
        <div className="task-modal-status-menu">
          <button
            className={`btn-tm-status-menu-head ${
              showStatusMenu ? "active" : ""
            }`}
            onClick={handleStatusMenu}
          >
            <p>{task.status || "Select Status"}</p>
            <img
              src={wideScreen ? arrowDown : arrowUp}
              alt="arrow"
              className={showStatusMenu ? "rotate" : ""}
            />
          </button>
          <div
            className={`tm-status-menu-body ${wideScreen ? "menu-down" : ""}  ${
              showStatusMenu ? "" : "hidden"
            }`}
          >
            {appData
              .filter((board) => board.name === taskInfo.board)[0]
              .columns.map((column, index) => {
                return <button key={index}>{column.name}</button>;
              })}
          </div>
        </div>
      </div>
      <div
        className="task-modal-bg"
        onClick={() => dispatch(setShowTaskModal(false))}
      ></div>
    </div>
  );
}

export default TaskModal;
