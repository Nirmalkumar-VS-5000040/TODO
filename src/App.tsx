import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import axios from "axios";

type deleteProp = string;

function App() {
  const [inp, setinp] = useState("");
  const [todos, settodos] = useState([]);
  const [show, setshow] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/todos/`)
      .then(async function (response) {
        await settodos(response.data.data);
      })
      .then(() => {
        setshow(false);
        setshow(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const addTodo = async () => {
    axios
      .post(`http://localhost:3001/todos/${1}/create_todo`, {
        content: inp,
      })
      .then(async function (response) {
        await setshow(false);
        await setshow(true);

        await axios
          .get(`http://localhost:3001/todos/`)
          .then(async function (response) {
            await settodos(response.data.data);
          })
          .then(() => {
            setshow(true);
          })
          .catch(function (error) {
            console.log(error);
          });

        setinp("");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleDelete = async (id: deleteProp) => {
    await axios
      .post(`http://localhost:3001/todos/${id}/delete_todo`, {})
      .then(async function (response) {
        console.log(response);

        await axios
          .get(`http://localhost:3001/todos/`)
          .then(async function (response) {
            await settodos(response.data.data);
          })
          .then(() => {
            setshow(true);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChange = (e: any) => {
    setinp(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <h1>Todo</h1>
      </nav>
      <div className="main_container">
        <div className="container">
          <input className="input" onChange={handleChange} value={inp}></input>
          {show && todos.length > 0 && (
            <div>
              {todos.map((todo) => (
                <div className="row">
                  <h6>{todo[1]}</h6>
                  <button
                    onClick={() => {
                      handleDelete(todo[0]);
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="btn">
          <button className="button" onClick={addTodo}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
