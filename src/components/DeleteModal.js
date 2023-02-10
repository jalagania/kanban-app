import "./DeleteModal.css";
import { useDispatch, useSelector } from "react-redux";
import deleteModalSlice from "../store/deleteModalSlice";
import dataSlice from "../store/dataSlice";

function DeleteModal() {
  const dispatch = useDispatch();
  const { taskInfo } = useSelector((store) => store.taskModal);
  const { deleteModal } = useSelector((store) => store.deleteModal);
  const { appData, selectedBoard } = useSelector((store) => store.data);
  const { setShowDeleteModal } = deleteModalSlice.actions;
  const { setSelectedBoard, deleteBoard, deleteTask } = dataSlice.actions;

  const title = deleteModal === "board" ? "board" : "task";

  function handleConfirmDelete() {
    if (deleteModal === "board") {
      let index = appData.findIndex((board) => board.name === selectedBoard);
      index = index === 0 ? 1 : 0;
      dispatch(deleteBoard(selectedBoard));
      dispatch(setSelectedBoard(appData[index].name));
    } else {
      dispatch(deleteTask(taskInfo));
    }
    dispatch(setShowDeleteModal([false]));
  }

  function handleCancelDelete() {
    dispatch(setShowDeleteModal([false]));
  }

  return (
    <div className="delete-modal-container">
      <div className="delete-modal-window">
        <h2>Delete this {title}?</h2>
        {deleteModal === "board" && (
          <p>
            Are you sure you want to delete the '{selectedBoard}' board? This
            action will remove all columns and tasks and cannot be reversed.
          </p>
        )}
        {deleteModal === "task" && (
          <p>
            Are you sure you want to delete the '{taskInfo.title}' task and its
            subtasks? This action cannot be reversed.
          </p>
        )}
        <div className="delete-modal-buttons">
          <button
            className="btn btn-confirm-delete"
            onClick={handleConfirmDelete}
          >
            Delete
          </button>
          <button
            className="btn btn-cancel-delete"
            onClick={handleCancelDelete}
          >
            Cancel
          </button>
        </div>
      </div>
      <div className="delete-modal-bg" onClick={handleCancelDelete}></div>
    </div>
  );
}

export default DeleteModal;
