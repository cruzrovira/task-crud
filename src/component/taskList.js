const TaskList = ({ taskList, handleEdit, handleDelete }) => {
  return (
    <ul className="list-group">
      {taskList.map((task) => (
        <li className="list-group-item" key={task.id}>
          {task.name}
          <span className="float-end">
            <button
              className="btn btn-warning btn-sm me-2"
              onClick={() => handleEdit(task)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(task)}
            >
              Delete
            </button>
          </span>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
