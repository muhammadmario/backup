import React from "react";
import Todo from "./Todo";

export default function ListTodo({
  todos,
  handleCheck,
  handleDelete,
  handleEdit,
}) {
  return (
    <div className="flex flex-col  items-center gap-2 mt-5 h-[70vh] overflow-y-auto">
      {todos?.map((todo) => (
        <Todo
          key={todo.id}
          id={todo.id}
          title={todo.title}
          status={todo.status}
          handleDelete={handleDelete}
          handleCheck={handleCheck}
          handleEdit={handleEdit}
        />
      ))}
    </div>
  );
}
