import "./Board.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoardColumn from "./BoardColumn";
import boardFormSlice from "../store/boardFormSlice";

function Board() {
  const dispatch = useDispatch();
  const { setShowBoardFormModal } = boardFormSlice.actions;
  const { appData, selectedBoard } = useSelector((store) => store.data);
  const [data] = appData.filter((board) => board.name === selectedBoard);
  const [boardData, setBoardData] = useState(data);

  function handleAddNewColumn() {
    dispatch(setShowBoardFormModal([true, "edit"]));
  }

  function handleCreateNewBoard() {
    dispatch(setShowBoardFormModal([true, "add"]));
  }

  useEffect(() => {
    const [data] = appData.filter((board) => board.name === selectedBoard);
    setBoardData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appData, selectedBoard]);

  if (appData.length < 1) {
    return (
      <div className="board-container">
        <div className="empty-board-box">
          <p>There are no boards. Create a new board to get started.</p>
          <button
            className="btn btn-add-new-column"
            onClick={handleCreateNewBoard}
          >
            + Create New Board
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="board-container">
      {boardData && boardData.columns.length > 0 && (
        <div className="board-columns-box">
          {boardData.columns.map((column, index) => {
            return (
              <BoardColumn key={index} name={column} tasks={boardData.tasks} />
            );
          })}
          <div className="new-column-box">
            <button className="btn-new-column" onClick={handleAddNewColumn}>
              + New Column
            </button>
          </div>
        </div>
      )}
      {boardData && boardData.columns.length < 1 && (
        <div className="empty-board-box">
          <p>This board is empty. Create a new column to get started.</p>
          <button
            className="btn btn-add-new-column"
            onClick={handleAddNewColumn}
          >
            + Add New Column
          </button>
        </div>
      )}
    </div>
  );
}

export default Board;
