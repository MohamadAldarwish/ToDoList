import { v4 as uuidv4 } from "uuid";

export default function reducer(currentTodos, action) {
  switch (action.type) {
    case "added": {
      const newtodo = {
        id: uuidv4(),
        title: action.payload.newTitle,
        details: "",
        isCompleted: false,
      };
      const updatedTodos = [...currentTodos, newtodo];
      localStorage.setItem("todo", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "deleted": {
      const updatedTodos = currentTodos.filter((e) => {
        return e.id != action.payload.id;
      });
      localStorage.setItem("todo", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "update": {
      const updatedTodos = currentTodos.map((e) => {
        if (e.id == action.payload.id) {
          return {
            ...e,
            title: action.payload.title,
            details: action.payload.details,
          };
        } else {
          return e;
        }
      });
      localStorage.setItem("todo", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "get": {
      const updatedTodos = JSON.parse(localStorage.getItem("todo")) ?? [];
      return updatedTodos;
    }
    case "toggledCompleted": {
      const updatedTodos = currentTodos.map((e) => {
        if (e.id == action.payload.id) {
          const updatedTodo = { ...e, isCompleted: !e.isCompleted };
          return updatedTodo;
        }
        return e;
      });
      localStorage.setItem("todo", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    default: {
      throw new Error("Unknown Action" + action.type);
    }
  }
  return [];
}
