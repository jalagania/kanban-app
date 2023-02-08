import { useSelector } from "react-redux";
import "./App.css";
import Board from "./components/Board";
import DeleteModal from "./components/DeleteModal";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TaskModal from "./components/TaskModal";

function App() {
  const { deleteModalVisible } = useSelector((store) => store.deleteModal);
  const { taskModalVisible } = useSelector((store) => store.taskModal);

  return (
    <div className="app-container">
      {deleteModalVisible && <DeleteModal />}
      {taskModalVisible && <TaskModal />}
      <Header />
      <Sidebar />
      <Board />
    </div>
  );
}

export default App;
