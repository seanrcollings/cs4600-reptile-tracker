import { NumberInput } from "atomic-elements";
import { HusbandryRecordCreation } from "../../../../src/types";
import { ApiError } from "../../lib/api";
import { Form } from "../../styles";

type Props = {
  value: HusbandryRecordCreation;
  error: ApiError | null;
  onChange: (value: HusbandryRecordCreation) => void;
  onSubmit?: () => void;
};

export default function HusbandryForm({
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
      <NumberInput
        label="Length (cm)"
        value={value.length}
        onChange={(v) => onChange({ ...value, length: v })}
        error={error?.get("/length")}
        min={0}
        size="medium"
        required
      />
      <NumberInput
        label="Weight (g)"
        value={value.weight}
        onChange={(v) => onChange({ ...value, weight: v })}
        error={error?.get("/weight")}
        min={0}
        size="medium"
        required
      />
      <NumberInput
        label="Temperature (c)"
        value={value.temperature}
        onChange={(v) => onChange({ ...value, temperature: v })}
        error={error?.get("/temperature")}
        min={0}
        size="medium"
        required
      />
      <NumberInput
        label="Humidity (%)"
        value={value.humidity}
        onChange={(v) => onChange({ ...value, humidity: v })}
        error={error?.get("/humidity")}
        min={0}
        max={100}
        size="medium"
        required
      />
    </Form>
  );
}
