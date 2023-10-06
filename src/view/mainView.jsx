import { useState, useEffect } from "react";
import { BaseLayout } from "../layout/baseLayout";
import Student from "../components/Student";
import { Button, Grid, TextField, Typography } from "@mui/material";
import Clipboard from "../components/Clipboard";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import PieChart from "../components/PieChart";

Chart.register(CategoryScale);

const Data = [
  {
    id: 1,
    year: 2016,
    userGain: 80000,
    userLost: 823,
  },
  {
    id: 2,
    year: 2017,
    userGain: 45677,
    userLost: 345,
  },
  {
    id: 3,
    year: 2018,
    userGain: 78888,
    userLost: 555,
  },
  {
    id: 4,
    year: 2019,
    userGain: 90000,
    userLost: 4555,
  },
  {
    id: 5,
    year: 2020,
    userGain: 4300,
    userLost: 234,
  },
];

export default function MainView({ classInformation, options }) {
  const [count, setCount] = useState(0);
  const [searchParameter, setSearchParameter] = useState("");
  const [currentStudents, setCurrentStudents] = useState([]);
  const [chartValue, setChartValue] = useState(0);

  const chartValues = (data) => {
    const orderData = {};
    const filteredData = [];

    for (const dataPoint of data) {
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

  console.log(chartValues(classInformation[count].students));

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
    getSpecificStudents(searchParameter || "");
  }, [searchParameter]);

  useEffect(() => {
    setSearchParameter("");
    getSpecificStudents("");
    setChartData({
      labels: chartValues(classInformation[count].students).map(
        (data) => data.label
      ),
      // datasets: chartValues(classInformation[count].students).map((data) => ({
      //   label: data.label,
      //   data: data,
      //   backgroundColor: [
      //     "rgba(75,192,192,1)",
      //     "#ecf0f1",
      //     "#50AF95",
      //     "#f3ba2f",
      //     "#2a71d0",
      //   ],
      //   borderColor: "black",
      //   borderWidth: 2,
      // })),
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
    <BaseLayout>
      <Grid
        container
        direction="row"
        justifyContent={"flex-start"}
        alignItems={"center"}
        sx={{ mb: 10 }}
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
        // justifyContent={"space-between"}
        spacing={2}
      >
        {classInformation[count] !== undefined && (
          <>
            <Grid
              container
              direction="row"
              spacing={2}
              sx={{ marginBottom: 5 }}
            >
              <Grid item md={3}>
                <Typography fontSize={39} fontWeight={"bold"}>
                  Clase {classInformation[count].name}
                </Typography>
                <Typography fontSize={39} fontWeight={"bold"}>
                  {classInformation[count].type}
                </Typography>

                <Typography fontSize={20} fontWeight={"light"}>
                  {classInformation[count].schedule}
                </Typography>
                <Typography fontSize={20} fontWeight={"light"}>
                  Numero de alumnos: {studentsNumber(classInformation[count])}
                </Typography>
                <Typography fontSize={20} fontWeight={"light"}>
                  Promedio de edad: {averageAge(classInformation[count])}
                </Typography>

                <TextField
                  label="Buscar"
                  variant="standard"
                  value={searchParameter}
                  onChange={(e) => {
                    setSearchParameter(e.target.value);
                  }}
                  sx={{ width: "100%" }}
                />
              </Grid>
              <Grid item md={1}></Grid>
              <PieChart chartData={chartData} setChartValue={setChartValue} />

              <Grid item md={1}></Grid>
              <Grid
                item
                md={3}
                sx={{
                  background: "#0D1117",
                  color: "white",
                  padding: "20px !important",
                  borderRadius: "20px",
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

            <Grid
              container
              direction="row"
              alignItems={"center"}
              justifyContent={"space-evenly"}
              spacing={1}
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
              {currentStudents.length === 0 && (
                <Grid item>No Elements found</Grid>
              )}
            </Grid>
          </>
        )}
        {classInformation[count] === undefined && (
          <Grid item>No Elements registered yet</Grid>
        )}
      </Grid>
    </BaseLayout>
  );
}
