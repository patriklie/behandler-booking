import { useAppStore } from "../store/authStore.js";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import axios from "axios";

const ProtectedRoutes = () => {

  const token = useAppStore((state) => state.token);
  const logout = useAppStore((state) => state.logout);
  const username = useAppStore((state) => state.username);
  const setUsername = useAppStore((state) => state.setUsername);
  const setEmail = useAppStore((state) => state.setEmail);
  const setRole = useAppStore((state) => state.setRole);
  const setIsAuth = useAppStore((state) => state.setIsAuth);
  const [tokenCheck, setTokenCheck] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifiserToken = async () => {

      if (!token) {
        navigate("/login");
        console.log("Token mangler, sendes til login.")
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!username) {
          setUsername(response.data.username);
          setEmail(response.data.email);
          setRole(response.data.role);
        }

        console.log("Respons fra verifiser token Auth/me: ", response.data);
        setIsAuth(true);
        setTokenCheck(true);

      } catch (error) {
        logout();
        navigate("/login");
        console.log(error.response.data.message, "Token ikke godkjent av backend.")
      }
    }
    verifiserToken();
  }, []);

  if (!tokenCheck) return <div>Laster...</div>

  return <Outlet />
}

export default ProtectedRoutes