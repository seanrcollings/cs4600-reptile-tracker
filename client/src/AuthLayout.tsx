import { Button } from "atomic-elements";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useApi, useAuth } from "./hooks";

export default function AuthLayout() {
  const navigate = useNavigate();
  const api = useApi();
  const auth = useAuth();

  useEffect(() => {
    if (!api.token) {
      navigate("/login", { replace: true });
    }
  }, []);

  const logout = () => {
    auth(null);
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
