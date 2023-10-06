import { Card, CardContent, Typography, Grid } from "@mui/material";

import Clipboard from "./Clipboard";
import CardProperty from "./CardProperty";
import { getCountryByCode } from "../utils/getCountryByCode";

export default function Student(props) {
  const {
    name,
    access,
    direct_link,
    age,
    payed_classes,
    given_classes,
    parent,
    email,
    number,
    backoffice_link,
    country,
    isStillInClass,
  } = props.student;
  return (
    <>
      {isStillInClass && (
        <Card
          variant="outlined"
          sx={{
            background: "#0D1117",
            color: "white",
            width: "inherit",
            maxHeight: "600px",
            minHeight: "600px",
            height: "100%",
          }}
        >
          <CardContent>
            <Grid container direction="row" alignItems={"flex-start"}>
              <Grid item md={6}>
                <CardProperty title={"Nombre Alumno:"} value={name} />
                <CardProperty title={"Edad:"} value={age} />
                <CardProperty title={"Padres:"} value={parent} />
              </Grid>
              <Grid item md={1}></Grid>

              <Grid item md={5}>
                <CardProperty title={"Clases Pagadas:"} value={payed_classes} />
                <CardProperty title={"Clases Tomadas:"} value={given_classes} />
                {/* <CardProperty title={"País:"} value={country} flag={true} /> */}
                <CardProperty
                  title={"País:"}
                  value={getCountryByCode(number).country}
                  flag={true}
                />
                {/* {console.log(getCountryByCode(number).country)} */}
              </Grid>
            </Grid>
            <hr />
            <Grid container direction="row" alignItems={"flex-start"}>
              <Grid item md={12}>
                <Clipboard
                  name={"Accesos: "}
                  link={access}
                  title={access}
                  side={false}
                />
                <Clipboard
                  name={"Direct Link: "}
                  link={direct_link}
                  side={false}
                />

                <Clipboard
                  name={"Email: "}
                  link={email}
                  title={email}
                  side={false}
                />
                <Clipboard
                  name={"Cel Number: "}
                  link={number}
                  title={number}
                  side={false}
                />

                <Clipboard
                  name={"Link a Backoffice de alumno: "}
                  link={backoffice_link}
                  side={false}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </>
  );
}
