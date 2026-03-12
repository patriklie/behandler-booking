import { useAppStore } from "../store/authStore.js";
import { Outlet, Navigate } from "react-router";

const ProtectedRoute = () => {


    const token = useAppStore((state) => state.token);

    if (!token) return <Navigate to="/login" />

  return <Outlet />
}

export default ProtectedRoute