import { useSelector } from "react-redux";
import "./App.css";
import Board from "./components/Board";
import DeleteModal from "./components/DeleteModal";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  const { deleteModalVisible } = useSelector((store) => store.deleteModal);

  return (
    <div className="app-container">
      {deleteModalVisible && <DeleteModal />}
      <Header />
      <Sidebar />
      <Board />
    </div>
  );
}

export default App;
