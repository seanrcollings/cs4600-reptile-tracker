import { useState } from "react";
import { useNavigate } from "react-router";
import { Button, ErrorBanner, TextInput } from "atomic-elements";

import { LoginRequest } from "../../../src/types";
import { useCreate, ReptileApi } from "../lib/api";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { loading, error }] = useCreate<
    LoginRequest,
    { token: string }
  >("/users/login");

  const navigate = useNavigate();

  const onSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    login({ email, password }).then(({ token }) => {
      ReptileApi.token = token;
      navigate("/dashboard", { replace: true });
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
