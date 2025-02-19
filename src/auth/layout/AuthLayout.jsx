import { Grid, Typography } from "@mui/material";

export function AuthLayout({ children, title = '' }) {
  return (
    <Grid
      container
      spacing={0}
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ minHeight: "100vh", backgroundColor: 'primary.main', padding: 4 }}
    >
      <Grid
        item
        xs={3}
        sx={{ backgroundColor: 'white', padding: 3, borderRadius: 2 }}
      >
        <Typography sx={{ mb: 1 }} variant="h5">{title}</Typography>

        {children}

      </Grid>
    </Grid>
  );
};