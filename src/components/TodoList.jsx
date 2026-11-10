import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ButtonGroup from "@mui/material/ButtonGroup";
import Todo from "./Todo";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect, useMemo } from "react";
import { useTodos } from "../contexts/TodosContext";
import { useToast } from "../contexts/ToastContext";

// Modal
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function TodoList() {
  const { toDo, dispatch } = useTodos();

  // const { showHideToast } = useContext(ToastContext);
  const { showHideToast } = useToast();

  const [TilteInput, SetTilteInput] = useState("");
  const [displyedTodosType, setDisplyedTodosType] = useState("all");

  const [showDeleteDialog, setshowDeleteDialog] = useState(false);
  const [showUpdateDialog, setshowUpdateDialog] = useState(false);

  const [dialogTodo, setdialogTodo] = useState("");

  const CompletedTodos = useMemo(() => {
    return toDo.filter((e) => {
      return e.isCompleted;
    });
  }, [toDo]);

  const nonCompletedTodos = useMemo(() => {
    return toDo.filter((e) => {
      return !e.isCompleted;
    });
  }, [toDo]);

  let todosToBeRendered = toDo;

  if (displyedTodosType == "Completed") {
    todosToBeRendered = CompletedTodos;
  } else if (displyedTodosType == "nonCompleted") {
    todosToBeRendered = nonCompletedTodos;
  } else {
    todosToBeRendered;
  }

  // handleing

  // Start Delete
  function openDeleteDialog(Todo) {
    setdialogTodo(Todo);
    setshowDeleteDialog(true);
  }

  function handleDelete() {
    setshowDeleteDialog(false);
  }

  function handelDeleteConfirm() {
    dispatch({ type: "deleted", payload: { id: dialogTodo.id } });
    setshowDeleteDialog(false);
    showHideToast("The Deletion Was Successful.");
  }

  function handeldsipledTodos(e) {
    setDisplyedTodosType(e.target.value);
  }
  // end Delete

  // start confirm
  function openUpdateDialog(Todo) {
    setdialogTodo(Todo);
    setshowUpdateDialog(true);
  }
  function handelUpdateConfirm() {
    dispatch({ type: "update", payload: dialogTodo });
    setshowUpdateDialog(false);
    showHideToast("The Modification Was Successful.");
  }

  function handleUpdateClose() {
    setshowUpdateDialog(false);
  }
  // End confirm

  useEffect(() => {
    dispatch({ type: "get" });
  }, []);

  // AddTodos
  function handelAddClick() {
    dispatch({ type: "added", payload: { newTitle: TilteInput } });
    SetTilteInput("");
    showHideToast("The Addition Was Successful.");
  }
  // End handleing

  const ToDos = todosToBeRendered.map((todo) => {
    return (
      <Todo
        key={todo.id}
        todo={todo}
        showDelete={openDeleteDialog}
        showUpdate={openUpdateDialog}
      />
    );
  });

  return (
    <>
      {/*   Modal Delete */}
      <Dialog
        open={showDeleteDialog}
        onClose={handleDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are You Sure about deleteing it?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            if you deleted it, it will be permanently deleted
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete}>Close</Button>
          <Button onClick={handelDeleteConfirm}>Agree</Button>
        </DialogActions>
      </Dialog>
      {/* End Modal Delete */}
      {/* Edite Mogal */}
      <Dialog
        open={showUpdateDialog}
        onClose={handleUpdateClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle id="alert-dialog-title">{"Update Task?"}</DialogTitle>
        <DialogContent>
          <TextField
            value={dialogTodo.title}
            onChange={(e) => {
              setdialogTodo({ ...dialogTodo, title: e.target.value });
            }}
            required
            margin="dense"
            id="name"
            label="Tilte Task"
            fullWidth
            variant="standard"
          />
          <TextField
            value={dialogTodo.details}
            onChange={(e) => {
              setdialogTodo({ ...dialogTodo, details: e.target.value });
            }}
            required
            margin="dense"
            id="name"
            label="Details Task"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>Close</Button>
          <Button onClick={handelUpdateConfirm}>Update</Button>
        </DialogActions>
      </Dialog>
      {/* End Edite Mogal */}
      <Container maxWidth="sm">
        <Card sx={{ minWidth: 275 }}>
          <CardContent className="max-h-[80vh] overflow-scroll ">
            <Typography variant="h4">My Tasks</Typography>
            <Divider />
            <ButtonGroup
              value={displyedTodosType}
              onClick={handeldsipledTodos}
              variant="contained"
              aria-label="Basic button group"
              className="mt-2.5"
            >
              <Button value="all">All</Button>
              <Button value="Completed">Completed</Button>
              <Button value="nonCompleted">Not Completed</Button>
            </ButtonGroup>
            {ToDos}
            <Grid container spacing={2}>
              <Grid size={8}>
                <TextField
                  id="outlined-basic"
                  label="Title Task"
                  variant="outlined"
                  sx={{ width: "100%" }}
                  value={TilteInput}
                  onChange={(event) => {
                    SetTilteInput(event.target.value);
                  }}
                />
              </Grid>
              <Grid size={4}>
                <Button
                  variant="contained"
                  sx={{ width: "100%", height: "100%" }}
                  onClick={handelAddClick}
                  disabled={TilteInput == 0}
                >
                  Add Task
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
