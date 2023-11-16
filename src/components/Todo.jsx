import React from "react";
import { useState } from "react";

function Todo({ id, title, handleDelete, completed, handleCheck, handleEdit }) {
  const [isEditing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleEditToggle = () => {
    setEditing(!isEditing);
  };

  const handleSaveEdit = () => {
    // Panggil fungsi handleEdit dengan parameter id dan newTitle
    handleEdit(id, newTitle);
    setEditing(false);
  };

  return (
    <div className="w-3/4  rounded-md bg-slate-500 py-3 flex justify-between items-center px-5">
      <div className="flex gap-3 justify-center items-center">
        <input
          id="default-checkbox"
          type="checkbox"
          checked={completed == 1}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          onChange={() => handleCheck(id, completed)}
        />
        {isEditing ? (
          <input
            className="bg-gray-400 px-2 text-white font-bold"
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        ) : (
          <span
            className={`text-white  font-bold ${
              completed == 1 ? "line-through" : ""
            }`}
          >
            {title}
          </span>
        )}
      </div>
      <div className="flex gap-1">
        <button
          onClick={isEditing ? handleSaveEdit : handleEditToggle}
          className={`text-white bg-blue-700 ${
            isEditing ? "bg-green-500" : "hover:bg-blue-800"
          } rounded-full w-6 h-6 flex flex-col justify-center items-center mr-2`}
        >
          {isEditing ? "✔" : "✏️"}
        </button>
        <button
          onClick={() => handleDelete(id)}
          className="text-white bg-red-600 rounded-full w-6 h-6 flex flex-col justify-center items-center"
        >
          &times;
        </button>
      </div>
    </div>
  );
}

export default Todo;
