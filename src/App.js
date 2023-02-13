import "./App.css";
import { useSelector } from "react-redux";
import Board from "./components/Board";
import DeleteModal from "./components/DeleteModal";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TaskModal from "./components/TaskModal";
import BoardFormModal from "./components/BoardFormModal";
import TaskFormModal from "./components/TaskFormModal";

function App() {
  const { deleteModalVisible } = useSelector((store) => store.deleteModal);
  const { taskModalVisible } = useSelector((store) => store.taskModal);
  const { boardFormModalVisible } = useSelector(
    (store) => store.boardFormModal
  );
  const { taskFormModalVisible } = useSelector((store) => store.taskFormModal);

  return (
    <div className="app-container">
      {deleteModalVisible && <DeleteModal />}
      {taskModalVisible && <TaskModal />}
      {boardFormModalVisible && <BoardFormModal />}
      {taskFormModalVisible && <TaskFormModal />}
      <Header />
      <Sidebar />
      <Board />
    </div>
  );
}

export default App;
