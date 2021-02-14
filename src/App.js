import { useState, useEffect } from "react";
import TaskList from "./component/taskList";
import TaskForm from "./component/taskForm";
import {
  getCollection,
  addDocument,
  updateDocument,
  deleteCollection,
} from "./service/cloudFirestore";

function App() {
  const [task, setTask] = useState({ name: "", id: "" });
  const [taskList, setTaskList] = useState(null);
  const [edit, setEdit] = useState(false);
  const [error, setEror] = useState(false);

  useEffect(() => {
    (async () => {
      const result = await getCollection("tasks");
      result.statusResponse && setTaskList(result.data);
    })();
  }, []);

  const handleChangeTask = (e) => {
    setTask({ ...task, name: e.target.value });
  };

  const handleAddSubmit = async (e) => {
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
      const result = await addDocument("tasks", { name: task.name });
      const newTask = result.data;
      newtaskList = taskList === null ? [newTask] : [...taskList, newTask];
    } else {
      // save edit

      await updateDocument("tasks", task.id, { name: task.name });

      newtaskList = taskList.map((taskItem) =>
        taskItem.id === task.id ? task : taskItem
      );

      setEdit(false);
    }
    setTaskList(newtaskList);
    setTask({ name: "", id: "" });
  };

  const handleDelete = (task) => {
    deleteCollection("tasks", task.id);
    const newtaskList = taskList.filter((taskItem) => taskItem.id !== task.id);
    if (newtaskList.length === 0) {
      setTaskList(null);
      localStorage.removeItem("tasklist");
    } else {
      setTaskList(newtaskList);
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
