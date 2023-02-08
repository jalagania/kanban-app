import "./BoardColumn.css";
import { useDispatch, useSelector } from "react-redux";
import taskModalSlice from "../store/taskModalSlice";

function BoardColumn(props) {
  const dispatch = useDispatch();
  const { selectedBoard } = useSelector((store) => store.data);
  const { setTaskInfo, setShowTaskModal } = taskModalSlice.actions;

  function handleTaskBox(board, column, index) {
    const taskInfo = {
      board,
      column,
      index,
    };
    dispatch(setTaskInfo(taskInfo));
    dispatch(setShowTaskModal(true));
  }

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
            <div
              key={index}
              className="task-box"
              onClick={() => {
                handleTaskBox(selectedBoard, props.column.name, index);
              }}
            >
              <h3 className="task-title">{task.title}</h3>
              <p className="subtask-amount-text">
                <span>
                  {
                    task.subtasks.filter((sub) => sub.isCompleted === true)
                      .length
                  }
                </span>
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
