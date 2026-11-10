import TodoList from "./components/TodoList";
import { ToastProvider } from "./contexts/ToastContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { TodosContext } from "./contexts/TodosContext";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";


import TodosProvider from "./contexts/TodosContext";

const initialTodos = [
  {
    id: uuidv4(),
    title: "Read a Book",
    details: "This Book Very beautiful",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "write a Book",
    details: "Is Good",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "The Best",
    details: "Iam Mohamad",
    isCompleted: false,
  },
];

const theme = createTheme({
  typography: {
    fontFamily: "A",
  },
});

function App() {
  const [toDo, SetToDo] = useState(initialTodos);

  return (
    <ThemeProvider theme={theme}>
      <TodosProvider>
        <ToastProvider>
          <div className="flex justify-center items-center bg-black h-screen">
            <TodoList />
          </div>
        </ToastProvider>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;
