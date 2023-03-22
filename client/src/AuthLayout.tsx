import { Button } from "atomic-elements";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { ReptileApi } from "./lib/api";

export default function AuthLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!ReptileApi.token) {
      navigate("/login", { replace: true });
    }
  }, []);

  const logout = () => {
    ReptileApi.logout();
    navigate("/login");
  };

  return (
    <div>
      <nav>
        <Button variant="inverted" onClick={logout}>
          Logout
        </Button>
      </nav>
      <Outlet />
    </div>
  );
}
