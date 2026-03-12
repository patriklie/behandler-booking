import { Outlet } from "react-router";
import Navbar from "./Navbar.jsx";

const Layout = () => {
  return (
    <>
        <Navbar />
        <Outlet />  
    </>
  )
}

export default Layout