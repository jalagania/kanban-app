import "./Sidebar.css";
import { useState } from "react";
import logoLight from "../assets/logo-light.svg";
import logoDark from "../assets/logo-dark.svg";
import logoMobile from "../assets/logo-mobile.svg";
import iconBoard from "../assets/icon-board.svg";
import sun from "../assets/icon-light-theme.svg";
import moon from "../assets/icon-dark-theme.svg";
import hideSidebar from "../assets/icon-hide-sidebar.svg";
import showSidebar from "../assets/icon-show-sidebar.svg";
import { useDispatch, useSelector } from "react-redux";
import dataSlice from "../store/dataSlice";

function Sidebar() {
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarHidden, setSidebarHidden] = useState(false);

  document.body.className = darkMode ? "dark-mode" : "";

  const { appData } = useSelector((store) => store.data);
  const { selectedBoard } = useSelector((store) => store.data);
  const { setSelectedBoard } = dataSlice.actions;

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  function handleHideSidebar() {
    setSidebarHidden(true);
  }

  function handleShowSidebar() {
    setSidebarHidden(false);
  }

  return (
    <div className="sidebar-container">
      <div className={`logo-box ${sidebarHidden ? "logo-border" : ""}`}>
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
      <div className={`sidebar-body ${sidebarHidden ? "hidden" : ""}`}>
        <div className="boards-container">
          <p className="all-boards-text">All boards ({appData.length})</p>
          <div className="boards-box">
            {appData.map((board, index) => {
              return (
                <button
                  key={index}
                  className={`btn-board ${
                    selectedBoard === board.name ? "selected" : ""
                  }`}
                  onClick={() => dispatch(setSelectedBoard(board.name))}
                >
                  <img
                    src={iconBoard}
                    alt="board icon"
                    className="icon-board"
                  />
                  <p>{board.name}</p>
                </button>
              );
            })}
            <button className="btn-board btn-create-new-board">
              <img src={iconBoard} alt="board icon" className="icon-board" />
              <p>+ Create New Board</p>
            </button>
          </div>
        </div>
        <div className="theme-box" onClick={handleThemeChange}>
          <img src={sun} alt="sun icon" className="icon-sun" />
          <div className="theme-switcher">
            <p className={`theme-switcher-ball ${darkMode ? "ml" : ""}`}>
              &bull;
            </p>
          </div>
          <img src={moon} alt="moon icon" className="icon-moon" />
        </div>
        <button className="btn-hide-sidebar" onClick={handleHideSidebar}>
          <img
            src={hideSidebar}
            alt="hide sidebar icon"
            className="icon-hide-sidebar"
          />
          <p className="hide-sidebar-text">Hide Sidebar</p>
        </button>
      </div>
      <button
        className={`btn-show-sidebar ${sidebarHidden ? "" : "hidden"}`}
        onClick={handleShowSidebar}
      >
        <img src={showSidebar} alt="show sidebar icon" />
      </button>
    </div>
  );
}

export default Sidebar;
