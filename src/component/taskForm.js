const TaskForm = ({ handleAddSubmit, handleChangeTask, task, edit, error }) => {
  return (
    <form className="d-grid gap-2" onSubmit={handleAddSubmit}>
      <input
        type="text"
        className="form-control"
        value={task.name}
        onChange={handleChangeTask}
      />
      {error && <p className="text-danger">Task name is required </p>}
      <input
        type="submit"
        value={edit === false ? "Add" : "Edit"}
        className={edit === false ? "btn btn-primary" : "btn btn-warning"}
      />
    </form>
  );
};

export default TaskForm;
