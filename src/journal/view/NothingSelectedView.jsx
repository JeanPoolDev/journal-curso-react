import { StarOutline } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";

export function NothingSelectedView() {
  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='center'
      sx={{
        minHeight: 'calc(100vh - 110px)',
        backgroundColor: 'primary.main', borderRadius: '12px'
      }}
    >
      <Grid item xs={12}>
        <StarOutline sx={{ fontSize: 100, color: 'white' }} />
      </Grid>

      <Grid item xs={12}>
        <Typography color="white">Selecciona o crea una entrada</Typography>
      </Grid>

    </Grid>
  );
};