import "./App.css";
import Board from "./components/Board";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="app-container">
      <Header />
      <Sidebar />
      <Board />
    </div>
  );
}

export default App;
