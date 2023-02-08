import "./DeleteModal.css";
import { useDispatch, useSelector } from "react-redux";
import deleteModalSlice from "../store/deleteModalSlice";
import dataSlice from "../store/dataSlice";

function DeleteModal() {
  const dispatch = useDispatch();
  const { selectedBoard } = useSelector((store) => store.data);
  const { setShowDeleteModal } = deleteModalSlice.actions;
  const { deleteBoard } = dataSlice.actions;

  function handleConfirmDelete() {
    dispatch(deleteBoard(selectedBoard));
    dispatch(setShowDeleteModal(false));
  }

  function handleCancelDelete() {
    dispatch(setShowDeleteModal(false));
  }

  return (
    <div className="delete-modal-container">
      <div className="delete-modal-window">
        <h2>Delete this board?</h2>
        <p>
          Are you sure you want to delete the '{selectedBoard}' board? This
          action will remove all columns and tasks and cannot be reversed.
        </p>
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
