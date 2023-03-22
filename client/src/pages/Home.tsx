import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useApi } from "../hooks";
import { PageWrapper } from "../styles";

const Title = styled.h1`
  font-size: 50px;
  text-align: center;
`;

const Description = styled.p`
  font-size: 20px;
`;

export default function Home() {
  const navigate = useNavigate();
  const api = useApi();

  useEffect(() => {
    if (!api.token) return;
    navigate("/dashboard", { replace: true });
  }, []);

  return (
    <PageWrapper width={500}>
      <Title>Reptile Tracking Site</Title>
      <Description>
        A site to help you keep track of your reptile friends!
      </Description>
      <Link to="/login">Login</Link>
      <br />
      <Link to="/signup">Sign Up</Link>
    </PageWrapper>
  );
}
