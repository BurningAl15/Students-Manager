import React, { useState } from "react";
import { Pie, Bar, Line, Doughnut } from "react-chartjs-2";
import { Button, Grid, Typography } from "@mui/material";

function CustomChart({ chartData, setChartValue }) {
  const [chart, setChart] = useState(0);

  const getChart = (chartValue) => {
    switch (chartValue) {
      case 0:
        return (
          <Pie
            data={chartData}
            width={300}
            height={300}
            options={{
              maintainAspectRatio: false,
              plugins: {
                title: {
                  display: false,
                  text: "Users Gained between 2016-2020",
                },
              },
              legend: {
                display: false,
              },
            }}
          />
        );
      case 1:
        return (
          <Doughnut
            width={300}
            height={300}
            data={chartData}
            options={{
              maintainAspectRatio: false,
              plugins: {
                title: {
                  display: false,
                  text: "Users Gained between 2016-2020",
                },
              },
              legend: {
                display: false,
              },
            }}
          />
        );
      case 2:
        return (
          <Bar
            width={300}
            height={300}
            data={chartData}
            options={{
              maintainAspectRatio: false,
              plugins: {
                title: {
                  display: false,
                  text: "Users Gained between 2016-2020",
                },
              },
              legend: {
                display: false,
              },
            }}
          />
        );
      case 3:
        return (
          <Line
            width={300}
            height={300}
            data={chartData}
            options={{
              maintainAspectRatio: false,
              plugins: {
                title: {
                  display: false,
                  text: "Users Gained between 2016-2020",
                },
              },
              legend: {
                display: false,
              },
            }}
          />
        );
    }
  };

  return (
    <Grid
      item
      xs={5}
      direction="column"
      justifyContent={"flex-start"}
      alignItems={"center"}
      className="chart-container"
      disablegutters
      sx={{
        border: "1px solid #0D1117",
        borderRadius: "20px",
        maxWidth: "300px",
        width: "80%",
        minHeight: "400px",
        maxHeight: "400px",
        padding: "0 !important",
      }}
    >
      <Typography sx={{ textAlign: "center" }}>Ages</Typography>
      <Grid item>{getChart(chart)}</Grid>

      <Grid item disablegutters>
        <Button
          onClick={() => {
            setChart(0);
            setChartValue(0);
          }}
        >
          Pie
        </Button>
        <Button
          onClick={() => {
            setChart(1);
            setChartValue(1);
          }}
        >
          Doughnut
        </Button>
        <Button
          onClick={() => {
            setChart(2);
            setChartValue(2);
          }}
        >
          Bar
        </Button>
        <Button
          onClick={() => {
            setChart(3);
            setChartValue(3);
          }}
        >
          Line
        </Button>
      </Grid>
    </Grid>
  );
}
export default CustomChart;
