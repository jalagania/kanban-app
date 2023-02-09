import "./Board.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BoardColumn from "./BoardColumn";

function Board() {
  const { appData, selectedBoard } = useSelector((store) => store.data);
  const [data] = appData.filter((board) => board.name === selectedBoard);
  const [boardData, setBoardData] = useState(data);

  useEffect(() => {
    const [data] = appData.filter((board) => board.name === selectedBoard);
    setBoardData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appData, selectedBoard]);

  return (
    <div className="board-container">
      {boardData.columns.length > 0 && (
        <div className="board-columns-box">
          {boardData.columns.map((column, index) => {
            return (
              <BoardColumn key={index} name={column} tasks={boardData.tasks} />
            );
          })}
          <div className="new-column-box">
            <button className="btn-new-column">+ New Column</button>
          </div>
        </div>
      )}
      {boardData.columns.length < 1 && (
        <div className="empty-board-box">
          <p>This board is empty. Create a new column to get started.</p>
          <button className="btn btn-add-new-column">+ Add New Column</button>
        </div>
      )}
    </div>
  );
}

export default Board;
