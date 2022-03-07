import { Box, Grid, Toolbar } from "@mui/material";
import { alertService, alertSeverity } from "../../services/alert.service";
import { PageAlert } from "./alert";
import { SideMenu } from "./SideMenu";

export default function AuthenticatedLayout(props) {
  return (
    <>
      <SideMenu>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={6}>
              <PageAlert />
            </Grid>
          </Grid>
          <Toolbar />
          {props.children}
        </Box>
      </SideMenu>
    </>
  );
}