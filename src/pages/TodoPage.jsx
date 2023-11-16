import React from "react";
import AddForm from "../components/AddForm";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ListTodo from "../components/ListTodo";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function TodoPage() {
  const [todos, setTodos] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
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

  const handleCheck = async (id, currentStatus) => {
    try {
      const updatedTodos = todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: currentStatus === 1 ? 0 : 1 }
          : todo
      );
      setTodos(updatedTodos);

      const response = await fetch(`http://127.0.0.1:8000/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: updatedTodos.find((todo) => todo.id === id).title,
          completed: currentStatus === 1 ? 0 : 1,
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
          completed: 0,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const newTodo = await response.json();
      const newTodoData = await newTodo.data;

      setTodos((prevTodos) => [...prevTodos, newTodoData]);

      toast.success("Todo added successfully", {
        position: "bottom-center",
      });
    } catch {
      console.error("Error updating data:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (id, newTitle) => {
    try {
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
      toast.success("Todo edited successfully", {
        position: "bottom-center",
      });
    } catch (error) {
      console.error("Error updating data:", error.message);
    }
  };

  const handleDelete = async (id) => {
    confirmAlert({
      title: "Are you sure?",
      message: "Are you sure to delete this todo.",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              setIsLoading(true);
              const response = await fetch(
                `http://127.0.0.1:8000/api/todos/${id}`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              if (!response.ok) {
                throw new Error("Network response was not ok");
              }

              const updatedData = todos.filter((item) => item.id !== id);
              setTodos(updatedData);
              toast.success("Todo deleted", {
                position: "bottom-center",
              });
            } catch (error) {
              console.error("Error deleting data:", error.message);
            } finally {
              setIsLoading(false);
            }
          },
        },
        {
          label: "No",
          onClick: () => {
            return;
          },
        },
      ],
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Header />
      <AddForm handleSubmit={handleSubmit} isLoading={isLoading} />
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
          setTodos={setTodos}
        />
      )}

      <ToastContainer />
      <Footer todos={todos} />
    </>
  );
}
