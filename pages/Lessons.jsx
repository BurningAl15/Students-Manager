import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Typography,
  Slide,
  Tabs,
  Tab,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
} from "@mui/material";
import Clipboard from "../src/components/Clipboard";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { capitalize } from "../src/utils/stringUtils";

export default function Lessons({ lessons_list, lessons_options }) {
  const [count, setCount] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [searchParameter_m, setSearchParameter_m] = useState("");
  const [searchParameter_l, setSearchParameter_l] = useState("");
  const [currentLessons_list, setCurrentLessons_list] = useState(
    lessons_list[lessons_options[count].name]
  );

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    getSpecificLessons(searchParameter_m || "", searchParameter_l || "");
  }, [searchParameter_m, searchParameter_l]);

  useEffect(() => {
    setSearchParameter_l("");
    setSearchParameter_m("");
    getSpecificLessons("");
  }, [count]);

  const getSpecificLessons = (
    searchParameter_m = "",
    searchParameter_l = ""
  ) => {
    const filtered = lessons_list[lessons_options[count].name];

    if (searchParameter_m === "" && searchParameter_l === "") {
      setCurrentLessons_list(filtered);
    } else if (searchParameter_m !== "" && searchParameter_l === "") {
      let filteredAndSearched = filtered.filter(
        (lesson) => lesson.moduleNumber == searchParameter_m
      );
      setCurrentLessons_list(filteredAndSearched);
    } else if (searchParameter_l !== "" && searchParameter_m === "") {
      let filteredAndSearched = filtered.filter(
        (lesson) => lesson.lessonNumber == searchParameter_l
      );
      setCurrentLessons_list(filteredAndSearched);
    } else {
      let filteredAndSearched = filtered.filter(
        (lesson) =>
          lesson.moduleNumber == searchParameter_m &&
          lesson.lessonNumber == searchParameter_l
      );
      setCurrentLessons_list(filteredAndSearched);
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
        {/* <Tabs
          value={value}
          onChange={() => setCount(option.index)}
          aria-label=
        ></Tabs> */}
        {lessons_options.map((option) => (
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
        sx={{
          maxWidth: "80%",
          width: "80%",
          minWidth: "80%",
          margin: "0 auto",
        }}
      >
        <Grid item sx={{ padding: 0, marginBottom: 5 }}>
          <Typography fontSize={39} fontWeight={"bold"}>
            {capitalize(lessons_options[count].name)}
          </Typography>
        </Grid>
        <Grid item sx={{ padding: 0, marginBottom: 5 }}>
          <TextField
            type="number"
            label="Filtrar/Buscar por Módulo"
            variant="standard"
            value={searchParameter_m}
            onChange={(e) => {
              setSearchParameter_m(e.target.value);
            }}
            sx={{ width: "100%" }}
          />
          <TextField
            type="number"
            label="Filtrar/Buscar por Lección"
            variant="standard"
            value={searchParameter_l}
            onChange={(e) => {
              setSearchParameter_l(e.target.value);
            }}
            sx={{ width: "100%" }}
          />
        </Grid>

        {currentLessons_list !== undefined && (
          <>
            <Grid
              container
              justifyContent={"center"}
              alignItems={"center"}
              direction={"column"}
              disablegutters
              sx={{ marginBottom: 5 }}
            >
              {currentLessons_list.map((item) => (
                <Grid
                  item
                  xs
                  key={`m${item.moduleNumber}l${item.lessonNumber}`}
                  sx={{
                    maxWidth: "100%",
                    width: "100%",
                    minWidth: "100%",
                    margin: "0 auto",
                  }}
                >
                  {/* <Typography>{`m${item.moduleNumber}l${item.lessonNumber}`}</Typography> */}
                  <Accordion
                    expanded={
                      expanded === `m${item.moduleNumber}l${item.lessonNumber}`
                    }
                    onChange={handleChange(
                      `m${item.moduleNumber}l${item.lessonNumber}`
                    )}
                    sx={{marginBottom:2}}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`m${item.moduleNumber}l${item.lessonNumber}content`}
                      id={`m${item.moduleNumber}l${item.lessonNumber}header`}
                    >
                      <Typography sx={{ width: "5%", flexShrink: 0 }}>
                        {`M${item.moduleNumber}L${item.lessonNumber}.`}
                      </Typography>
                      <Typography sx={{ color: "text.secondary" }}>
                        {item.lessonName}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {/* <Typography>
                        Nulla facilisi. Phasellus sollicitudin nulla et quam
                        mattis feugiat. Aliquam eget maximus est, id dignissim
                        quam.
                      </Typography> */}
                      {/* m${item.moduleNumber}l${item.lessonNumber} */}
                      <Clipboard
                        name="URL: "
                        link={item.url}
                        // title={classInformation[count].technical_support}
                        side={false}
                      />
                      <Clipboard
                        name="Study Guide: "
                        link={item.studyGuide}
                        // title={classInformation[count].technical_support}
                        side={false}
                      />
                      <Clipboard
                        name="PPT: "
                        link={item.ppt}
                        // title={classInformation[count].technical_support}
                        side={false}
                      />
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {!!lessons_list && currentLessons_list === undefined && (
          <Grid item>No Lessons registered yet</Grid>
        )}
      </Grid>
    </>
  );
}
