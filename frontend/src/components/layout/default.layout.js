import { CssBaseline, Grid } from "@mui/material";
import { alertService, alertSeverity } from "../../services/alert.service";
import { PageAlert } from "./alert";
import ResponsiveAppBar from "./nav"
import StickyFooter from './stickyFooter';

export default function DefaultLayout(props) {
  
  return (
    <>
      <CssBaseline />
      <ResponsiveAppBar />
      <main>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={6}>
            <PageAlert />
          </Grid>
        </Grid>
          {props.children}
      </main>
      <StickyFooter />
    </>
  );  
}