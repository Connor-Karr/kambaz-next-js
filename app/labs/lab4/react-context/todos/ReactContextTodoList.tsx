"use client";
import { useTodos } from "./todosContext";
import { ListGroup, ListGroupItem, Button, FormControl } from "react-bootstrap";
export default function ReactContextTodoList() {
  const { todos, todo, setTodo, addTodo, deleteTodo, updateTodo } = useTodos()!;
  return (
    <div id="wd-todo-list-context">
      <h2>Todo List</h2>
      <ListGroup>
        <ListGroupItem className="d-flex align-items-center">
          <FormControl
            className="me-2"
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
          <Button onClick={() => updateTodo(todo)}
            id="wd-update-todo-click" className="btn btn-warning me-2">
            Update
          </Button>
          <Button onClick={() => addTodo(todo)}
            id="wd-add-todo-click" className="btn btn-success">
            Add
          </Button>
        </ListGroupItem>
        {todos.map((t) => (
          <ListGroupItem key={t.id} className="d-flex justify-content-between align-items-center">
            {t.title}
            <div>
              <Button onClick={() => setTodo(t)}
                id="wd-set-todo-click" className="btn btn-primary me-2">
                Edit
              </Button>
              <Button onClick={() => deleteTodo(t.id)}
                id="wd-delete-todo-click" className="btn btn-danger">
                Delete
              </Button>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
