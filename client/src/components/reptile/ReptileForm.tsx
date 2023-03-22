import { Option, Select, TextInput } from "atomic-elements";
import { ReptileCreation } from "../../../../src/types";
import { ApiError } from "../../lib/api";
import { Form } from "../../styles";

type Props = {
  value: ReptileCreation;
  error: ApiError | null;
  onChange: (value: ReptileCreation) => void;
  onSubmit?: () => void;
};

export default function ReptileForm({
  value,
  onChange,
  onSubmit,
  error,
}: Props) {
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit && onSubmit();
      }}
    >
      <TextInput
        label="Name"
        value={value.name}
        onChange={(v) => onChange({ ...value, name: v })}
        size="medium"
        error={error?.get("/name")}
        required
      />

      <Select
        label="Sex"
        value={value.sex}
        onChange={(v) => onChange({ ...value, sex: v })}
        error={error?.get("/sex")}
        required
      >
        <Option value="m">Male</Option>
        <Option value="f">Female</Option>
      </Select>

      <Select
        label="Species"
        value={value.species}
        onChange={(v) => onChange({ ...value, species: v })}
        error={error?.get("/species")}
        required
      >
        <Option value="ball_python">Ball Python</Option>
        <Option value="king_snake">King Snake</Option>
        <Option value="corn_snake">Corn Snake</Option>
        <Option value="redtail_boa">Redtail Boa</Option>
      </Select>
    </Form>
  );
}
