import {
  CheckBox,
  Label,
  Modal,
  Option,
  Select,
  Textarea,
} from "atomic-elements";
import { useState } from "react";
import { ScheduleCreation } from "../../../../src/types";
import { useCreate } from "../../hooks";
import { DayName, sentenceCase } from "../../lib/utils";
import { Form } from "../../styles";

interface Props {
  reptileId: number;
  open: boolean;
  onClose: (created: boolean) => void;
}

const defaultValues = {
  type: "clean",
  description: "",
  monday: true,
  tuesday: true,
  wednesday: true,
  thursday: true,
  friday: true,
  saturday: true,
  sunday: true,
};

export default function CreateScheduleModal({
  reptileId,
  open,
  onClose,
}: Props) {
  const [schedule, setSchedule] = useState<ScheduleCreation>(defaultValues);

  const [createSchedule, { error }] = useCreate<ScheduleCreation, unknown>(
    `/reptiles/${reptileId}/schedules`
  );

  const onSubmit = () => {
    createSchedule(schedule).then(() => {
      onClose(true);
      setSchedule(defaultValues);
    });
  };

  const days: DayName[] = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  return (
    <Modal
      open={open}
      title="New Schedule"
      onClose={() => onClose(false)}
      secondaryAction={() => onClose(false)}
      primaryButton="Save"
      primaryAction={onSubmit}
      centered
    >
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <Select
          label="Type"
          value={schedule.type}
          onChange={(v) => setSchedule({ ...schedule, type: v })}
          error={error?.get("/type")}
          required
        >
          <Option value="clean">Clean</Option>
          <Option value="record">Record</Option>
          <Option value="feed">Feed</Option>
        </Select>

        <Textarea
          label="Description"
          value={schedule.description}
          onChange={(v) => setSchedule({ ...schedule, description: v })}
          resize={false}
          error={error?.get("/description")}
          required
        />

        <Label error={error?.get("/days")} htmlFor="">
          Scheduled Days
        </Label>

        {days.map((day) => (
          <CheckBox
            key={day}
            label={sentenceCase(day)}
            checked={schedule[day]}
            onChange={(v) => setSchedule({ ...schedule, [day]: v })}
          />
        ))}
      </Form>
    </Modal>
  );
}
