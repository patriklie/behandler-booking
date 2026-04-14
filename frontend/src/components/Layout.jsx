import { Outlet } from "react-router";
import Navbar from "./Navbar.jsx";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "60px" }}>
      <Outlet />   
      </div>
      <Toaster 
        position="bottom-center"
        containerStyle={{
          /* top: 90 */
        }}
      toastOptions={{
      style: {
        padding: "10px 32px",
        borderRadius: "50px",
        boxShadow: "rgba(0, 0, 0, 0.4) 0 2px 10px"
      }
      }}
      />
    </>
  )
}

export default Layout