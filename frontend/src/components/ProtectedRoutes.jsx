import { useAppStore } from "../store/authStore.js";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import axios from "axios";

const ProtectedRoutes = () => {

  const token = useAppStore((state) => state.token);
  const logout = useAppStore((state) => state.logout);
  const setTypeBehandler = useAppStore((state) => state.setTypeBehandler)
  const setUsername = useAppStore((state) => state.setUsername);
  const setEmail = useAppStore((state) => state.setEmail);
  const setRole = useAppStore((state) => state.setRole);
  const setIsAuth = useAppStore((state) => state.setIsAuth);
  const isAuth = useAppStore((state) => state.isAuth);
  const [tokenCheck, setTokenCheck] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifiserToken = async () => {

      if (!token) {
        navigate("/login");
        console.log("Token mangler, sendes til login.")
        return;
      }

      // denne må jeg se mer på senere vil faile for utløpte tokens, mulig lage axios interceptor på status 401.
      if (isAuth) {
        setTokenCheck(true);
        console.log("Bruker er authorized")
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUsername(response.data.username);
        setEmail(response.data.email);
        setRole(response.data.role);
        setTypeBehandler(response.data.typeBehandler || "");
        setIsAuth(true);
        setTokenCheck(true);
        
        console.log("Respons fra verifiser token Auth/me: ", response.data);

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