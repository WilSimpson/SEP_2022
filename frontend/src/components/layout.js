import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "./nav";
import StickyFooter from "./stickyFooter";

const Layout = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Outlet />
      <StickyFooter />
    </>
  )
};

export default Layout;