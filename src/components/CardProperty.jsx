import { Grid, Typography } from "@mui/material";

export default function CardProperty(props) {
  const { title, value } = props;
  return (
    <Grid>
      <Typography fontSize={18} fontWeight={"bold"}>
        {title}
      </Typography>
      <Typography sx={{ mb: 1 }}>{value}</Typography>
    </Grid>
  );
}
