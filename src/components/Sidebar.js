import "./Sidebar.css";
import { useState } from "react";
import logoLight from "../assets/logo-light.svg";
import logoDark from "../assets/logo-dark.svg";
import logoMobile from "../assets/logo-mobile.svg";
import iconBoard from "../assets/icon-board.svg";
import sun from "../assets/icon-light-theme.svg";
import moon from "../assets/icon-dark-theme.svg";
import hideSidebar from "../assets/icon-hide-sidebar.svg";
import { useSelector } from "react-redux";

function Sidebar() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarHidden, setSidebarHidden] = useState(false);

  document.body.className = darkMode ? "dark-mode" : "";

  const { appData } = useSelector((store) => store.data);

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  function handleHideSidebar() {
    setSidebarHidden(true);
  }

  return (
    <div className="sidebar-container">
      <div className="logo-box">
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
                <button key={index} className="btn-board">
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
    </div>
  );
}

export default Sidebar;
