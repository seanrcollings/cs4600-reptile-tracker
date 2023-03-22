import { useState } from "react";
import { useNavigate } from "react-router";
import { Button, ErrorBanner, TextInput } from "atomic-elements";

import { LoginRequest } from "../../../src/types";
import { Link } from "react-router-dom";
import { useAuth, useCreate } from "../hooks";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authorize = useAuth();

  const [login, { loading, error }] = useCreate<
    LoginRequest,
    { token: string }
  >("/users/login");

  const navigate = useNavigate();

  const onSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    login({ email, password }).then(({ token }) => {
      authorize(token);
      // Timing issue
      setTimeout(() => navigate("/dashboard", { replace: true }), 0);
    });
  };

  return (
    <div>
      {error && <ErrorBanner>{error.toString()}</ErrorBanner>}
      <form onSubmit={onSubmit}>
        <TextInput label="Email" value={email} onChange={setEmail} required />
        <TextInput
          /* @ts-ignore */
          type="password"
          label="Password"
          value={password}
          onChange={setPassword}
          required
        />
        <Button type="submit" loading={loading}>
          Login
        </Button>
      </form>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
}
