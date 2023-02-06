import "./BoardColumn.css";

function BoardColumn(props) {
  return (
    <div className="column-container">
      <h4 className="column-name">
        <span className={`ball ${props.column.name.toLowerCase()}`}></span>
        <span>{props.column.name} </span>
        <span>({props.column.tasks.length})</span>
      </h4>
      <div className="tasks-container">
        {props.column.tasks.map((task, index) => {
          return (
            <div key={index} className="task-box">
              <h3 className="task-title">{task.title}</h3>
              <p className="subtask-amount-text">
                <span>0</span>
                <span> of {task.subtasks.length} subtasks</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BoardColumn;
