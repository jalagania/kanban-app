import "./Sidebar.css";
import iconBoard from "../assets/icon-board.svg";
import sun from "../assets/icon-light-theme.svg";
import moon from "../assets/icon-dark-theme.svg";
import hideSidebar from "../assets/icon-hide-sidebar.svg";
import showSidebar from "../assets/icon-show-sidebar.svg";
import { useDispatch, useSelector } from "react-redux";
import dataSlice from "../store/dataSlice";
import sidebarSlice from "../store/sidebarSlice";

function Sidebar() {
  const dispatch = useDispatch();
  const { sidebarHidden, darkMode } = useSelector((store) => store.sidebar);
  const { setDarkMode, setSidebarHidden } = sidebarSlice.actions;
  const { appData } = useSelector((store) => store.data);
  const { selectedBoard } = useSelector((store) => store.data);
  const { setSelectedBoard } = dataSlice.actions;

  document.body.className = darkMode ? "dark-mode" : "";

  function handleThemeChange() {
    dispatch(setDarkMode(!darkMode));
  }

  function handleHideSidebar() {
    dispatch(setSidebarHidden(true));
  }

  function handleShowSidebar() {
    dispatch(setSidebarHidden(false));
  }

  return (
    <div className="sidebar-container">
      <div className={`sidebar-body ${sidebarHidden ? "hidden" : ""}`}>
        <div className="boards-container">
          <h4 className="all-boards-text">All boards ({appData.length})</h4>
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
