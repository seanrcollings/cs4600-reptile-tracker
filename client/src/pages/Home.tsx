import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useApi } from "../hooks";
import { ReptileApi } from "../lib/api";

export default function Home() {
  const navigate = useNavigate();
  const api = useApi();

  useEffect(() => {
    if (!api.token) return;
    navigate("/dashboard", { replace: true });
  }, []);

  return (
    <main>
      <h1>Reptile Tracking Site</h1>
      <p>Site to keep record of your different reptiles</p>
      <Link to="/login">Login</Link>
      <br />
      <Link to="/signup">Sign Up</Link>
    </main>
  );
}
