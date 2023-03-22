import styled from "styled-components";

export const PageWrapper = styled.div<{ width?: number }>`
  margin: auto;
  width: ${({ width = 1000 }) => `${width}px`};
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

export const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
