import { Button, TextInput } from "atomic-elements";
import { useState } from "react";
import { CreateUserRequest } from "../../../src/types";
import { useNavigate } from "react-router";
import { useCreate } from "../hooks";
import { ActionsContainer, Form, PageWrapper } from "../styles";
import { Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [signUp, { loading, error }] = useCreate<CreateUserRequest, any>(
    "/users"
  );

  const navigate = useNavigate();

  const onSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    signUp({ email, password, firstName, lastName }).then(() =>
      navigate("/login")
    );
  };

  return (
    <PageWrapper>
      <h1>Sign Up</h1>
      <Form onSubmit={onSubmit}>
        <TextInput
          label="First Name"
          value={firstName}
          onChange={setFirstName}
          error={error?.get("/firstName")}
          required
        />
        <TextInput
          label="Last Name"
          value={lastName}
          onChange={setLastName}
          error={error?.get("/lastName")}
          required
        />
        <TextInput
          type="text"
          label="Email"
          value={email}
          onChange={setEmail}
          error={error?.get("/email")}
          required
        />
        <TextInput
          /* @ts-ignore */
          type="password"
          label="Password"
          value={password}
          onChange={setPassword}
          error={error?.get("/password")}
          required
        />
        <ActionsContainer>
          <Link to="/login">Login</Link>
          <Button type="submit" loading={loading}>
            Login
          </Button>
        </ActionsContainer>
      </Form>
    </PageWrapper>
  );
}
