import "./Board.css";

function Board() {
  return (
    <div className="board-container">
      <div className="board-columns-box"></div>
      <div className="empty-board-box">
        <p>This board is empty. Create a new column to get started.</p>
        <button className="btn btn-add-new-column">+ Add New Column</button>
      </div>
    </div>
  );
}

export default Board;
