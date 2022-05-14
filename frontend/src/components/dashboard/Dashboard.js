import React, { useEffect, useState } from "react";
import {
  addListItem,
  getList,
  deleteItem,
  updateStatus,
  updateListItem,
} from "../../api/api";
import Loader from "../loader/Loader";
import "./dashboard.css";

export default function Dashboard() {
  const [odata, setOdata] = useState([]);
  const [data, setData] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [updating, setUpdating] = useState(false);
  const [id, setId] = useState("");
  const [ucompleted, setUcompleted] = useState("");
  const [filter, setFilter] = useState("All");
  const email = window.location.pathname.split("/")[2];

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    setSpinner(true);
    await getList(email).then((res) => {
      setData(res.data);
      setOdata(res.data);
      setSpinner(false);
    });
  }

  const openAddNewForm = () => {
    document.querySelector(".new-todo-form").style.transform = "scale(1)";
  };
  const closeAddNewForm = () => {
    document.querySelector(".new-todo-form").style.transform = "scale(0)";
    setTitle("");
    setDesc("");
    setDate("");
    setUpdating(false);
  };

  async function addNewData() {
    await addListItem(email, {
      title: title,
      desc: desc,
      date: date,
    });
    setTitle("");
    setDesc("");
    setDate("");
    document.querySelector(".new-todo-form").style.transform = "scale(0)";
    setSpinner(true);
    await getList(email).then((res) => {
      setData(res.data);
    });
    setSpinner(false);
  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete item?")) {
      const res = await deleteItem(email, id);
      getData();
    }
  }

  async function handleStatusUpdate(id) {
    if (window.confirm("Are you sure you want to update status?")) {
      const res = await updateStatus(email, id);
      getData();
    }
  }

  async function handleUpdate(item) {
    setUpdating(true);
    setTitle(item.title);
    setDesc(item.desc);
    setDate(item.date);
    setId(item._id);
    setUcompleted(item.completed);
    document.querySelector(".new-todo-form").style.transform = "scale(1)";
  }

  async function updateData() {
    const res = await updateListItem(email, id, title, desc, date, ucompleted);
    setUpdating(false);
    document.querySelector(".new-todo-form").style.transform = "scale(0)";
    setTitle("");
    setDesc("");
    setDate("");
    getData();
  }

  async function manageFilter(ffilter) {
    if (ffilter === "All") {
      setData(odata);
    } else if (ffilter === "Completed") {
      const filteredData = data.filter((item) => item.completed == true);
      setData(filteredData);
    }
     else if (ffilter === "Pending") {
      const filteredData = odata.filter((item) => item.completed == false);
      setData(filteredData);
    }
  }

  return (
    <div className="dashboard">
      {spinner && <Loader />}
      <div className="new-todo">
        <button className="new-todo-btn" onClick={openAddNewForm}>
          + Add New
        </button>
        <div className="new-todo-form">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              {
                updating ? updateData() : addNewData();
              }
            }}
          >
            <label>Title *</label>
            <input
              type="text"
              placeholder="Title"
              required
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></input>
            <label>Description *</label>
            <input
              type="text"
              placeholder="Description"
              required
              value={desc}
              maxLength={120}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            ></input>
            <label>Due Date *</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            ></input>
            <input type="submit" value={updating ? "Update" : "Add"}></input>
            <input
              type="button"
              value={"Cancel"}
              onClick={closeAddNewForm}
            ></input>
          </form>
        </div>
        <select className="filter" onChange={async (e) => {await manageFilter(e.target.value)}}>
          <option value={"All"}>All</option>
          <option value={"Completed"}>Completed</option>
          <option value={"Pending"}>Pending</option>
        </select>
      </div>

      <div className="todo-list">
        {data.map((item) => (
          <div className="todo-card" key={item._id}>
            <div className="todo-card-title">{item.title}</div>
            <div className="todo-card-desc">{item.desc}</div>
            <div className="todo-card-date">
              <div>Due Date: {item.date}</div>
              <div>
                <button
                  className="todo-card-btn"
                  onClick={() => handleUpdate(item)}
                >
                  <i className="fa-solid fa-pen"></i>
                </button>
                <button
                  className="todo-card-btn"
                  onClick={() => handleDelete(item._id)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
            <div
              className="todo-card-status"
              style={{
                borderRight: item.completed
                  ? "solid 25px lawngreen"
                  : "solid 25px red",
                borderTop: item.completed
                  ? "solid 25px lawngreen"
                  : "solid 25px red",
                borderLeft: "solid 25px transparent",
                borderBottom: "solid 25px transparent",
              }}
              onClick={() => {
                !item.completed && handleStatusUpdate(item._id);
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
