import { useState, useEffect, forwardRef } from "react";
import { Button, Grid, Typography, Slide } from "@mui/material";
import Clipboard from "../src/components/Clipboard";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import CustomChart from "../src/components/CustomChart";
import CustomDialog from "../src/components/CustomDialog";

Chart.register(CategoryScale);

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Students({ classInformation, options }) {
  const [count, setCount] = useState(0);
  const [currentStudents, setCurrentStudents] = useState([]);
  const [searchParameter, setSearchParameter] = useState("");
  const [open, setOpen] = useState(false);
  const [chartValue, setChartValue] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const chartValues = (data) => {
    const orderData = {};
    const filteredData = [];
    const validatedData = data.filter((element) => element.isStillInClass);

    for (const dataPoint of validatedData) {
      const label = dataPoint.age;
      const data = dataPoint.name;

      if (!orderData.hasOwnProperty(label)) {
        orderData[label] = [];
      }

      orderData[label].push(data);
    }

    for (let temp of Object.entries(orderData)) {
      const label = temp[0];
      const countData = temp[1].length;
      let data = {
        label,
        data: countData,
      };
      filteredData.push(data);
    }

    return filteredData;
  };

  const [chartData, setChartData] = useState({
    labels: chartValues(classInformation[count].students).map(
      (data) => data.label
    ),
    datasets: [
      {
        label: "",
        data: chartValues(classInformation[count].students).map(
          (data) => data.data
        ),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    setSearchParameter("");
    getSpecificStudents("");
    setChartData({
      labels: chartValues(classInformation[count].students).map(
        (data) => data.label
      ),
      datasets: [
        {
          label: "",
          data: chartValues(classInformation[count].students).map(
            (data) => data.data
          ),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });
  }, [count]);

  const averageAge = (info) => {
    let sumAges = 0;
    const size = info.students.length;
    for (let i = 0; i < size; i++) {
      sumAges += info.students[i].age;
    }
    return parseInt(sumAges / size);
  };

  const studentsNumber = (info) => {
    let count = 0;
    const size = info.students.length;
    for (let i = 0; i < size; i++) {
      if (info.students[i].isStillInClass) {
        count += 1;
      }
    }
    return count;
  };

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

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent={"flex-start"}
        alignItems={"center"}
        disablegutters
      >
        {options.map((option) => (
          <Grid
            key={`${option.name}-${option.index}`}
            item
            sx={{ marginRight: "10px" }}
          >
            <Button
              variant="contained"
              onClick={() => {
                setCount(option.index);
              }}
            >
              {option.name}
            </Button>
          </Grid>
        ))}
      </Grid>

      <Grid
        container
        direction="column"
        justifyContent={"center"}
        alignItems={"center"}
        spacing={2}
        disablegutters
      >
        {console.log(classInformation)}
        {classInformation[count] !== undefined && (
          <>
            <Grid
              container
              justifyContent={"center"}
              alignItems={"center"}
              direction={"column"}
              disablegutters
              sx={{ marginBottom: 5 }}
            >
              <Grid item xs="auto" disablegutters>
                <Typography fontSize={39} fontWeight={"bold"}>
                  Clase {classInformation[count].name}
                </Typography>
              </Grid>

              <Grid item xs="auto" disablegutters>
                <Typography fontSize={39} fontWeight={"bold"}>
                  {classInformation[count].type}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              direction="row"
              spacing={2}
              columns={16}
              justifyContent={"center"}
              disablegutters
              sx={{ marginBottom: 5, maxWidth: "100%" }}
            >
              <Grid container direction="column" xs={3} disablegutters>
                <Grid
                  container
                  direction="column"
                  xs
                  disablegutters
                  sx={{ paddingLeft: "2rem" }}
                >
                  <Grid item disablegutters>
                    <Typography fontSize={16} fontWeight={"bold"}>
                      Horario:
                    </Typography>
                    <Typography fontSize={20} fontWeight={"light"}>
                      {classInformation[count].schedule}
                    </Typography>
                  </Grid>

                  <Grid item disablegutters>
                    <Typography fontSize={14} fontWeight={"bold"}>
                      Numero de alumnos:{" "}
                    </Typography>
                    <Typography fontSize={20} fontWeight={"light"}>
                      {studentsNumber(classInformation[count])}
                    </Typography>
                  </Grid>

                  <Grid item disablegutters>
                    <Typography fontSize={16} fontWeight={"bold"}>
                      Promedio de edad:
                    </Typography>
                    <Typography fontSize={20} fontWeight={"light"}>
                      {averageAge(classInformation[count])}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item xs={2} disablegutters />
              </Grid>

              <Grid
                item
                xs={1}
                disablegutters
                sx={{
                  padding: "0 !important",
                }}
              ></Grid>

              <CustomChart
                chartData={chartData}
                setChartValue={setChartValue}
              />

              <Grid
                item
                xs={1}
                disablegutters
                sx={{
                  padding: "0 !important",
                }}
              ></Grid>

              <Grid
                item
                xs={4}
                disablegutters
                sx={{
                  background: "#0D1117",
                  color: "white",
                  padding: "20px !important",
                  borderRadius: "20px",
                  margin: "0",
                }}
              >
                <Clipboard
                  name="Soporte Tecnico: "
                  link={classInformation[count].technical_support}
                  title={classInformation[count].technical_support}
                  side={false}
                />
                <Clipboard
                  name="Link de zoom: "
                  link={classInformation[count].link_zoom}
                  side={false}
                />
                <Clipboard
                  name="Chat WSP: "
                  link={classInformation[count].chat}
                  side={false}
                />
                <Clipboard
                  name="Ultimo video zoom: "
                  link={classInformation[count].last_class}
                  side={false}
                />
              </Grid>
            </Grid>
            <Grid item>
              <Button variant="outlined" onClick={handleClickOpen}>
                Ver Información de los alumnos
              </Button>
            </Grid>
          </>
        )}

        <CustomDialog
          open={open}
          onClose={handleClose}
          currentStudents={currentStudents}
          setCurrentStudents={setCurrentStudents}
          TransitionComponent={Transition}
          classTitle={`Clase ${classInformation[count].name}`}
          searchParameter={searchParameter}
          setSearchParameter={setSearchParameter}
          classInformation={classInformation}
          count={count}
        />
        {classInformation[count] === undefined && (
          <Grid item>No Elements registered yet</Grid>
        )}
      </Grid>
    </>
  );
}
