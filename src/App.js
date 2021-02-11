import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskList from "./component/taskList";
import TaskForm from "./component/taskForm";

function App() {
  const [task, setTask] = useState({ name: "", id: "" });
  const [taskList, setTaskList] = useState(null);
  const [edit, setEdit] = useState(false);
  const [error, setEror] = useState(false);

  useEffect(() => {
    const taskListStorage = localStorage.getItem("tasklist");
    taskListStorage !== null && setTaskList(JSON.parse(taskListStorage));
  }, []);

  const handleChangeTask = (e) => {
    setTask({ ...task, name: e.target.value });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    // validate
    if (task.name.trim() === "") {
      setEror(true);
      return;
    }
    setEror(false);
    let newtaskList = "";
    if (edit === false) {
      // save add
      const newTask = { ...task, id: uuidv4() };
      newtaskList = taskList === null ? [newTask] : [...taskList, newTask];
    } else {
      // save edit
      newtaskList = taskList.map((taskItem) =>
        taskItem.id === task.id ? task : taskItem
      );

      setEdit(false);
    }
    setTaskList(newtaskList);
    localStorage.setItem("tasklist", JSON.stringify(newtaskList));
    setTask({ name: "", id: "" });
  };

  const handleDelete = (task) => {
    const newtaskList = taskList.filter((taskItem) => taskItem.id !== task.id);
    if (newtaskList.length === 0) {
      setTaskList(null);
      localStorage.removeItem("tasklist");
    } else {
      setTaskList(newtaskList);
      localStorage.setItem("tasklist", JSON.stringify(newtaskList));
    }
  };

  const handleEdit = (task) => {
    setTask(task);
    setEdit(true);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-white">Task Crud</h1>
      <hr />
      <div className="row align-items-start">
        <div className="col col-md-8 col-12">
          <h3 className="text-center text-white">List Tasks</h3>
          {taskList === null ? (
            <h4 className="text-center text-white">number tasks 0</h4>
          ) : (
            <TaskList
              taskList={taskList}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          )}
        </div>
        <div className="col col-md-4 col-12 mt-2 mt-md-0   p-2 shadow-sm bg-white">
          <h3 className="text-center">
            {edit === false ? "Add Task" : "Edit Task"}
          </h3>
          <TaskForm
            handleAddSubmit={handleAddSubmit}
            handleChangeTask={handleChangeTask}
            task={task}
            edit={edit}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
