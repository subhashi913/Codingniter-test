import React, { useEffect, useState } from "react";
import axios from "axios";

function Task() {
  const API = "http://localhost:8080/tasks";

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get(API).then((res) => {
      setTasks(res.data);
    });
  };

  const addTask = () => {
    if (!title) return alert("Enter title");

    axios.post(API, {
      title,
      description,
      status: "pending"
    }).then(() => {
      fetchTasks();
      setTitle("");
      setDescription("");
    });
  };

  const updateStatus = (task) => {
    axios.put(API + "/" + task.id, {
      ...task,
      status: task.status === "pending" ? "completed" : "pending"
    }).then(fetchTasks);
  };

  const deleteTask = (id) => {
    axios.delete(API + "/" + id).then(fetchTasks);
  };

  const filteredTasks = tasks.filter(
    (t) => filter === "all" ? true : t.status === filter
  );

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Task Manager</h3>

      {/* Add Task */}
      <div className="row mb-3">
        <div className="col">
          <input
            className="form-control"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="col">
          <input
            className="form-control"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="col">
          <button className="btn btn-success w-100" onClick={addTask}>
            Add Task
          </button>
        </div>
      </div>

      {/* Filter */}
      <div className="mb-3">
        <select
          className="form-select w-25"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Table */}
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>

              <td>
                <span className={`badge ${task.status === "completed" ? "bg-success" : "bg-warning"}`}>
                  {task.status}
                </span>
              </td>

              <td>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => updateStatus(task)}
                >
                  Toggle
                </button>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Task;
