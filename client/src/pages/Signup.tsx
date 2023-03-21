import { Button, ErrorBanner, TextInput } from "atomic-elements";
import { useState } from "react";
import { useCreate } from "../lib/api";
import { CreateUserRequest } from "../../../src/types";
import { useNavigate } from "react-router";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [signUp, { loading, error, data }] = useCreate<CreateUserRequest, any>(
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
    <div>
      {error && <ErrorBanner>{error}</ErrorBanner>}
      <form onSubmit={onSubmit}>
        <TextInput
          label="First Name"
          value={firstName}
          onChange={setFirstName}
        />
        <TextInput label="Last Name" value={lastName} onChange={setLastName} />
        <TextInput
          type="text"
          label="Email"
          value={email}
          onChange={setEmail}
        />
        <TextInput
          /* @ts-ignore */
          type="password"
          label="Password"
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
