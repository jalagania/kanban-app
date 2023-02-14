import "./Header.css";
import logoLight from "../assets/logo-light.svg";
import logoDark from "../assets/logo-dark.svg";
import logoMobile from "../assets/logo-mobile.svg";
import arrowMobile from "../assets/icon-chevron-up.svg";
import ellipsis from "../assets/icon-vertical-ellipsis.svg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import deleteModalSlice from "../store/deleteModalSlice";
import boardFormSlice from "../store/boardFormSlice";
import taskFormSlice from "../store/taskFormSlice";
import sidebarSlice from "../store/sidebarSlice";

function Header() {
  const dispatch = useDispatch();
  const { sidebarHidden, mobileSidebarHidden, darkMode } = useSelector(
    (store) => store.sidebar
  );
  const { appData, selectedBoard } = useSelector((store) => store.data);
  const { setMobileSidebarHidden } = sidebarSlice.actions;
  const { setShowDeleteModal } = deleteModalSlice.actions;
  const { setShowBoardFormModal } = boardFormSlice.actions;
  const { setShowTaskFormModal } = taskFormSlice.actions;
  const [showMenu, setShowMenu] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const mobile = document.body.clientWidth <= 425;

  function handleAddTask() {
    dispatch(setShowTaskFormModal([true, "add"]));
    if (mobile) {
      dispatch(setMobileSidebarHidden(true));
    }
  }

  function handleEditBoard() {
    dispatch(setShowBoardFormModal([true, "edit"]));
    setShowMenu(false);
  }

  function handleDeleteBoard() {
    dispatch(setShowDeleteModal([true, "board"]));
    setShowMenu(false);
  }

  function handleEllipsisButton() {
    setShowMenu(!showMenu);
    if (mobile) {
      dispatch(setMobileSidebarHidden(true));
    }
  }

  function handleSidebarMobile() {
    if (mobile) {
      dispatch(setMobileSidebarHidden(!mobileSidebarHidden));
    }
  }

  useEffect(() => {
    function closeEditBoardMenu(event) {
      if (
        !event.target.closest(".btn-ellipsis") &&
        !event.target.closest(".edit-board-menu")
      ) {
        setShowMenu(false);
      }
    }

    document.addEventListener("click", closeEditBoardMenu);

    return () => {
      document.removeEventListener("click", closeEditBoardMenu);
    };
  }, []);

  useEffect(() => {
    if (appData.length < 1) {
      setDisabled(true);
    } else if (
      appData.filter((board) => board.name === selectedBoard)[0].columns
        .length < 1
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [appData, selectedBoard]);

  return (
    <header className="header-container">
      <div
        className={`logo-box ${sidebarHidden ? "logo-border" : "logo-width"}`}
      >
        <img
          src={logoLight}
          alt="logo"
          className={`logo ${darkMode ? "" : "hidden"}`}
        />
        <img
          src={logoDark}
          alt="logo"
          className={`logo ${darkMode ? "hidden" : ""}`}
        />
        <img src={logoMobile} alt="logo" className="logo-mobile" />
      </div>
      {appData.length < 1 && <div className="header-right-wrapper"></div>}
      {appData.length > 0 && (
        <div className="header-right-wrapper">
          <div className="header-heading-box" onClick={handleSidebarMobile}>
            <h1>{selectedBoard}</h1>
            <img
              src={arrowMobile}
              alt="arrow icon"
              className={`arrow-mobile ${mobileSidebarHidden ? "rotate" : ""}`}
            />
          </div>
          <button
            disabled={disabled}
            className={`btn btn-add-new-task ${disabled ? "disabled" : ""}`}
            onClick={handleAddTask}
          >
            {mobile ? "+" : "+ Add New Task"}
          </button>
          <button className="btn-ellipsis" onClick={handleEllipsisButton}>
            <img src={ellipsis} alt="vertical ellipsis" />
          </button>
          <div className={`edit-board-menu ${showMenu ? "" : "hidden"}`}>
            <button className="btn-edit-board" onClick={handleEditBoard}>
              Edit Board
            </button>
            <button className="btn-delete-board" onClick={handleDeleteBoard}>
              Delete Board
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
