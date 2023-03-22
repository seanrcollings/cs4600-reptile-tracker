import { useState } from "react";
import { useNavigate } from "react-router";
import { Button, ErrorBanner, TextInput } from "atomic-elements";
import styled from "styled-components";

import { LoginRequest } from "../../../src/types";
import { Link } from "react-router-dom";
import { useAuth, useCreate } from "../hooks";
import { ActionsContainer, Form, PageWrapper } from "../styles";

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
    <PageWrapper>
      <h1>Login</h1>
      {error && <ErrorBanner>{error.toString()}</ErrorBanner>}
      <Form onSubmit={onSubmit}>
        <TextInput label="Email" value={email} onChange={setEmail} required />
        <TextInput
          /* @ts-ignore */
          type="password"
          label="Password"
          value={password}
          onChange={setPassword}
          required
        />
        <ActionsContainer>
          <Link to="/signup">Sign Up</Link>
          <Button type="submit" loading={loading}>
            Login
          </Button>
        </ActionsContainer>
      </Form>
    </PageWrapper>
  );
}
