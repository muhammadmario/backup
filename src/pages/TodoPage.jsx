import React from "react";
import AddForm from "../components/AddForm";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ListTodo from "../components/ListTodo";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function TodoPage() {
  const [todos, setTodos] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://127.0.0.1:8000/api/todos");
      const result = await response.json();
      setTodos(result.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://127.0.0.1:8000/api/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedData = todos.filter((item) => item.id !== id);
      setTodos(updatedData);
    } catch (error) {
      console.error("Error deleting data:", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleCheck = async (id, currentStatus) => {
    try {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, status: currentStatus === 1 ? 0 : 1 } : todo
      );
      setTodos(updatedTodos);

      const response = await fetch(`http://127.0.0.1:8000/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: updatedTodos.find((todo) => todo.id === id).title,
          status: currentStatus === 1 ? 0 : 1,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error updating data:", error.message);
    }
  };
  const handleSubmit = async (title) => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://127.0.0.1:8000/api/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          status: 0,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const newTodo = await response.json();
      const newTodoData = await newTodo.data;

      setTodos((prevTodos) => [...prevTodos, newTodoData]);
    } catch {
      console.error("Error updating data:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (id, newTitle) => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://127.0.0.1:8000/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTitle,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedData = todos.map((item) =>
        item.id === id ? { ...item, title: newTitle } : item
      );
      setTodos(updatedData);
    } catch (error) {
      console.error("Error updating data:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <AddForm handleSubmit={handleSubmit} />
      {isLoading ? (
        <div className="min-h-[80vh] flex flex-col justify-center items-center">
          <ClipLoader color="#fff" />
        </div>
      ) : (
        <ListTodo
          todos={todos}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      )}
      <Footer todos={todos} />
    </>
  );
}
