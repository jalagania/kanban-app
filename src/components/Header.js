import "./Header.css";
import logoLight from "../assets/logo-light.svg";
import logoDark from "../assets/logo-dark.svg";
import logoMobile from "../assets/logo-mobile.svg";
import ellipsis from "../assets/icon-vertical-ellipsis.svg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import deleteModalSlice from "../store/deleteModalSlice";

function Header() {
  const dispatch = useDispatch();
  const { sidebarHidden, darkMode } = useSelector((store) => store.sidebar);
  const { selectedBoard } = useSelector((store) => store.data);
  const { setShowDeleteModal } = deleteModalSlice.actions;
  const [showMenu, setShowMenu] = useState(false);

  function handleEditBoard() {
    //
  }

  function handleDeleteBoard() {
    dispatch(setShowDeleteModal(true));
    setShowMenu(false);
  }

  function handleEllipsisButton() {
    setShowMenu(!showMenu);
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
      <div className="header-right-wrapper">
        <h1>{selectedBoard}</h1>
        <button className="btn btn-add-new-task">+ Add New Task</button>
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
    </header>
  );
}

export default Header;
