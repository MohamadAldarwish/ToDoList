import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useToast } from "../contexts/ToastContext";
import { useTodos } from "../contexts/TodosContext";

export default function Todo({ todo, showDelete, showUpdate }) {
  const { toDo, dispatch } = useTodos();
  const { showHideToast } = useToast();

  // EVENT HANDLING
  function handelCheckClick() {
    dispatch({ type: "toggledCompleted", payload: todo });
    showHideToast("Completed");
  }

  function handelShowDialog() {
    showDelete(todo);
  }

  function handelShowUpdate() {
    showUpdate(todo);
  }
  // END EVENT HANDLING

  // Modal
  return (
    <>
      <Card
        sx={{
          minWidth: 275,
          backgroundColor: "#1976d2",
          color: "white",
          margin: 2,
          ":hover": {
            cursor: "pointer",
            padding: "10px 0",
            transition: "0.3s",
          },
        }}
      >
        <CardContent>
          <Grid container>
            <Grid
              size={4}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <IconButton
                onClick={handelShowDialog}
                variant="outlined"
                aria-label="delete"
                color="error"
                sx={{ border: "solid #ff3d00 3px", backgroundColor: "white" }}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                onClick={handelShowUpdate}
                variant="outlined"
                color="secondary"
                sx={{ border: "solid #7c4dff 3px", backgroundColor: "white" }}
              >
                <EditOutlinedIcon />
              </IconButton>
              <IconButton
                onClick={handelCheckClick}
                variant="contained"
                color="#26a69a"
                sx={{
                  border: "solid #26a69a 3px",
                  backgroundColor: todo.isCompleted ? "#26a69a" : "white",
                  color: todo.isCompleted ? "white" : "#26a69a",
                }}
              >
                <CheckCircleIcon />
              </IconButton>
            </Grid>
            <Grid size={8}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "right",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  textAlign: "right",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.details}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
