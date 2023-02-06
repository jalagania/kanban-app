import "./Logo.css";
import logoLight from "../assets/logo-light.svg";
import logoDark from "../assets/logo-dark.svg";
import logoMobile from "../assets/logo-mobile.svg";
import { useSelector } from "react-redux";

function Logo() {
  const { sidebarHidden, darkMode } = useSelector((store) => store.sidebar);

  return (
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
  );
}

export default Logo;
