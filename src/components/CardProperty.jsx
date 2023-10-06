import { Grid, Typography } from "@mui/material";
import Flag from "react-world-flags";
import { simplifyCountry } from "../utils/simplifyCountry";

export default function CardProperty(props) {
  const { title, value, flag } = props;
  return (
    <Grid item xs="auto">
      <Typography fontSize={18} fontWeight={"bold"}>
        {title}
      </Typography>
      {flag === undefined && <Typography sx={{ mb: 1 }}>{value}</Typography>}
      {!!flag && (
        <Grid
          container
          justifyContent={"flex-start"}
          alignItems={"center"}
          sx={{ mb: 1 }}
        >
          <Flag
            code={simplifyCountry(value)}
            height="16"
            fallback={<span style={{ fontSize: "12px" }}>Unknown</span>}
          />
          <Typography sx={{ ml: 2 }}>{value}</Typography>
        </Grid>
      )}
    </Grid>
  );
}
