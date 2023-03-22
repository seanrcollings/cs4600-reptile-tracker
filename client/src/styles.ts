import styled from "styled-components";

export const PageWrapper = styled.div`
  margin: auto;
  width: 1000px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Card = styled.div`
  border: 1px solid lightgrey;
  border-radius: 10px;
  padding: 10px;
  height: 400px;
  overflow-y: auto;
`;

export const Form = styled.form`
  & .aje-input {
    padding-bottom: 1.1em;
  }
`;
