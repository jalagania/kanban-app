import "./BoardFormModal.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import boardFormSlice from "../store/boardFormSlice";
import dataSlice from "../store/dataSlice";

function BoardFormModal() {
  const dispatch = useDispatch();
  const { setShowBoardFormModal } = boardFormSlice.actions;
  const { setSelectedBoard, addBoard, updateBoard } = dataSlice.actions;
  const { boardFormModal } = useSelector((store) => store.boardFormModal);
  const { appData, selectedBoard } = useSelector((store) => store.data);
  const editing = boardFormModal === "edit";
  const board = appData.filter((board) => board.name === selectedBoard)[0];

  const [boardName, setBoardName] = useState(editing ? selectedBoard : "");
  const [boardColumns, setBoardColumns] = useState(
    editing ? board.columns : ["Todo", "Doing"]
  );
  const [error, setError] = useState(false);

  function handleBoardName(event) {
    setBoardName(event.target.value);
  }

  function handleBoardColumns(event, index) {
    const array = [...boardColumns];
    array[index] = event.target.value;
    setBoardColumns(array);
  }

  function handleColumnDelete(index) {
    setBoardColumns(boardColumns.filter((col, ind) => ind !== index));
  }

  function handleAddColumn() {
    setBoardColumns([...boardColumns, ""]);
  }

  function handleFormSubmit() {
    if (boardName !== "" && !boardColumns.includes("")) {
      if (editing) {
        const board = {
          name: boardName,
          columns: boardColumns,
        };
        dispatch(updateBoard(board));
      } else {
        const board = {
          name: boardName,
          columns: boardColumns,
          tasks: [],
        };
        dispatch(addBoard(board));
      }
      setError(false);
      dispatch(setSelectedBoard(boardName));
      dispatch(setShowBoardFormModal([false]));
    } else {
      setError(true);
    }
  }

  return (
    <div className="board-form-container">
      <form className="board-form" onClick={(event) => event.preventDefault()}>
        <h2 className="board-form-title">
          {editing ? "Edit" : "Add New"} Board
        </h2>
        <label>
          <span>Board Name</span>
          <input
            type="text"
            placeholder="e.g. Web Design"
            maxLength={25}
            value={boardName}
            onChange={handleBoardName}
          />
        </label>
        <div className="board-form-columns">
          <span>Board Columns</span>
          {boardColumns.map((column, index) => {
            return (
              <div key={index} className="board-form-column-box">
                <input
                  type="text"
                  placeholder="e.g. Web Design"
                  maxLength={25}
                  value={column}
                  onChange={(event) => handleBoardColumns(event, index)}
                />
                <button type="button" onClick={() => handleColumnDelete(index)}>
                  <svg
                    width="15"
                    height="15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fillRule="evenodd">
                      <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                      <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
                    </g>
                  </svg>
                </button>
              </div>
            );
          })}
          {error && <p className="error-text">All fields are mandatory</p>}
        </div>
        <div className="board-form-buttons">
          <button
            type="button"
            className="btn btn-add-form-column"
            onClick={handleAddColumn}
          >
            + Add New Column
          </button>
          <button
            type="submit"
            className="btn btn-form-create-board"
            onClick={handleFormSubmit}
          >
            {editing ? "Save Changes" : "Create New Board"}
          </button>
        </div>
      </form>
      <div
        className="board-form-bg"
        onClick={() => dispatch(setShowBoardFormModal([false]))}
      ></div>
    </div>
  );
}

export default BoardFormModal;
