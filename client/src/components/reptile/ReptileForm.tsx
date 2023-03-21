import { Option, Select, TextInput } from "atomic-elements";
import styled from "styled-components";
import { ReptileCreation } from "../../../../src/types";

const Form = styled.form`
  & .aje-input {
    padding-bottom: 1.1em;
  }
`;

type Props = {
  value: ReptileCreation;
  onChange: (value: ReptileCreation) => void;
};

export default function ReptileForm({ value, onChange }: Props) {
  return (
    <Form>
      <TextInput
        label="Name"
        value={value.name}
        onChange={(v) => onChange({ ...value, name: v })}
        size="medium"
      />

      <Select
        label="Sex"
        value={value.sex}
        onChange={(v) => onChange({ ...value, sex: v })}
      >
        <Option value="m">Male</Option>
        <Option value="f">Female</Option>
      </Select>

      <Select
        label="Species"
        value={value.species}
        onChange={(v) => onChange({ ...value, species: v })}
      >
        <Option value="ball_python">Ball Python</Option>
        <Option value="king_snake">King Snake</Option>
        <Option value="corn_snake">Corn Snake</Option>
        <Option value="redtail_boa">Redtail Boa</Option>
      </Select>
    </Form>
  );
}
