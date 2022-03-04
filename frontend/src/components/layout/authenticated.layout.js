import { Box, Grid } from "@mui/material";
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
            <Grid container spacing={2}>
              <Grid item sx={6}>
                <PageAlert />
              </Grid>
            </Grid>
            {props.children}
          </Box>
        </SideMenu>
      </>
    );  
}