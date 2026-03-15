import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import { ListGroupItem, Button } from "react-bootstrap";
export default function TodoItem({ todo }: { todo: any }) {
  const dispatch = useDispatch();
  return (
    <ListGroupItem className="d-flex justify-content-between align-items-center">
      {todo.title}
      <div>
        <Button onClick={() => dispatch(setTodo(todo))}
          id="wd-set-todo-click" className="btn btn-primary me-2">
          Edit</Button>
        <Button onClick={() => dispatch(deleteTodo(todo.id))}
          id="wd-delete-todo-click" className="btn btn-danger">
          Delete</Button>
      </div>
    </ListGroupItem>
  );
}
