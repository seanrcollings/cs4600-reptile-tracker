import { useState } from "react";
import { useNavigate } from "react-router";
import { Button, ErrorBanner, TextInput } from "atomic-elements";

import { LoginRequest } from "../../../src/types";
import { useCreate, ReptileApi } from "../lib/api";

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
      navigate("/dashboard");
    });
  };

  return (
    <div>
      {error && <ErrorBanner>{error}</ErrorBanner>}
      <form onSubmit={onSubmit}>
        <TextInput
          type="text"
          label="Email"
          name="email"
          value={email}
          onChange={setEmail}
        />
        <TextInput
          /* @ts-ignore */
          type="password"
          label="Password"
          name="password"
          value={password}
          onChange={setPassword}
        />
        <Button type="submit" loading={loading}>
          Login
        </Button>
      </form>
    </div>
  );
}
