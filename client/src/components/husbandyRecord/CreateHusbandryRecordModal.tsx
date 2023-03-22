import { HusbandryRecord, Reptile } from "@prisma/client";
import { Modal } from "atomic-elements";
import { useEffect, useState } from "react";
import { HusbandryRecordCreation } from "../../../../src/types";
import { useCreate } from "../../hooks";
import HusbandryForm from "./HusbandryForm";

interface Props {
  reptileId: number;
  open: boolean;
  onClose: (created: boolean) => void;
  defaultValues?: HusbandryRecordCreation;
}

const defaults = {
  length: 0,
  weight: 0,
  temperature: 0,
  humidity: 0,
};

export default function CreateHusbandryRecordModal({
  reptileId,
  open,
  onClose,
  defaultValues = defaults,
}: Props) {
  const [record, setRecord] = useState<HusbandryRecordCreation>(defaultValues);

  // Lazy, but works
  useEffect(() => setRecord(defaultValues), [defaultValues]);

  const [createRecord, { error }] = useCreate<
    HusbandryRecordCreation,
    HusbandryRecord
  >(`/reptiles/${reptileId}/husbandryRecords`);

  const onSubmit = () => {
    createRecord(record).then(() => {
      onClose(true);
      setRecord(defaultValues);
    });
  };

  return (
    <Modal
      open={open}
      title="Create New Husbandry Record"
      onClose={() => onClose(false)}
      secondaryAction={() => onClose(false)}
      primaryButton="Save"
      primaryAction={onSubmit}
      centered
    >
      <HusbandryForm
        value={record}
        onChange={setRecord}
        error={error}
        onSubmit={onSubmit}
      />
    </Modal>
  );
}
