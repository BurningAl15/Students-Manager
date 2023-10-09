import { useEffect } from "react";
import Student from "./Student";
import {
  IconButton,
  Grid,
  DialogTitle,
  Dialog,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function CustomDialog(props) {
  const {
    onClose,
    open,
    currentStudents,
    setCurrentStudents,
    classTitle,
    searchParameter,
    setSearchParameter,
    classInformation,
    count,
  } = props;

  useEffect(() => {
    getSpecificStudents(searchParameter || "");
  }, [searchParameter]);

  const getSpecificStudents = (searchParameter = "") => {
    const filtered = classInformation[count].students.filter(
      (student) => student.isStillInClass
    );
    if (searchParameter === "") {
      setCurrentStudents(filtered);
    } else {
      let filteredAndSearched = filtered.filter(
        (student) =>
          student.name
            .toLowerCase()
            .includes(searchParameter.toLocaleLowerCase()) ||
          student.parent
            .toLowerCase()
            .includes(searchParameter.toLocaleLowerCase()) ||
          student.age == searchParameter
      );
      setCurrentStudents(filteredAndSearched);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullScreen
      minWidth={"100%"}
      sx={{
        margin: 0,
        padding: 0,
        display: "flex",
        // maxWidth: "100% !important",
        // width: "100%",
        // minWidth: "100%",
      }}
      //   sx={{ maxWidth: "100% !important", width:'100%' }}
    >
      <DialogTitle>
        <Grid
          container
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{
            padding: 0,
            margin: 0,
            maxWidth: "100% !important",
            width: "100%",
          }}
        >
          <Grid item xs={2} disablegutters>
            {classTitle}
          </Grid>

          <Grid item xs={2} disablegutters />

          <Grid item xs disablegutters>
            <TextField
              label="Filtro/búsqueda alumnos"
              variant="standard"
              value={searchParameter}
              onChange={(e) => {
                setSearchParameter(e.target.value);
              }}
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid item xs={2} disablegutters />

          <Grid
            item
            xs={2}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>

      <Grid
        container
        direction="row"
        alignItems={"center"}
        justifyContent={"center"}
        spacing={1}
        sx={{
          maxWidth: "100% !important",
          width: "100%",
          minWidth: "100%",
        }}
      >
        {currentStudents.length > 0 &&
          currentStudents.map((student) => (
            <Grid
              item
              key={student.id}
              sx={{
                maxWidth: "470px",
                width: "100%",
                maxHeight: "600px",
                minHeight: "600px",
                height: "100%",
                marginBottom: 1,
              }}
            >
              <Student student={student} />
            </Grid>
          ))}
        {currentStudents.length === 0 && <Grid item>No Elements found</Grid>}
      </Grid>
    </Dialog>
  );
}
