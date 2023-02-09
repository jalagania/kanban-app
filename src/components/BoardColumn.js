import "./BoardColumn.css";
import { useDispatch, useSelector } from "react-redux";
import taskModalSlice from "../store/taskModalSlice";

function BoardColumn(props) {
  const dispatch = useDispatch();
  const { selectedBoard } = useSelector((store) => store.data);
  const { setTaskInfo, setShowTaskModal } = taskModalSlice.actions;

  function handleTaskBox(board, title) {
    const taskInfo = {
      board,
      title,
    };
    dispatch(setTaskInfo(taskInfo));
    dispatch(setShowTaskModal(true));
  }

  return (
    <div className="column-container">
      <h4 className="column-name">
        <span className={`ball ${props.name.toLowerCase()}`}></span>
        <span>{props.name} </span>
        <span>
          ({props.tasks.filter((task) => task.status === props.name).length})
        </span>
      </h4>
      <div className="tasks-container">
        {props.tasks
          .filter((task) => task.status === props.name)
          .map((task, index) => {
            return (
              <div
                key={index}
                className="task-box"
                onClick={() => {
                  handleTaskBox(selectedBoard, task.title);
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
