import React from "react";
import Todo from "./Todo";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function ListTodo({
  todos,
  handleCheck,
  handleDelete,
  handleEdit,
  setTodos,
}) {
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newTodos = [...todos];
    const [reorderedItem] = newTodos.splice(result.source.index, 1);
    newTodos.splice(result.destination.index, 0, reorderedItem);

    // Update the order of todos
    // You may want to send an API request to update the server-side order here

    // TODO: Add logic to update server-side order

    // Update the state
    setTodos(newTodos);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          <ul
            className="flex flex-col items-center gap-2 mt-5 h-[70vh] overflow-y-auto"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {todos?.map((todo, index) => (
              <Draggable
                key={todo.id}
                draggableId={todo.id.toString()}
                index={index}
              >
                {(provided) => (
                  <li
                    className="w-full flex flex-col items-center"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Todo
                      key={todo.id}
                      id={todo.id}
                      title={todo.title}
                      completed={todo.completed}
                      handleDelete={handleDelete}
                      handleCheck={handleCheck}
                      handleEdit={handleEdit}
                    />
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
