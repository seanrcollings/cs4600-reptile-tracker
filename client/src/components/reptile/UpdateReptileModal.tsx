import { useState } from "react";
import { Reptile } from "@prisma/client";
import { ReptileCreation } from "../../../../src/types";
import { Modal } from "atomic-elements";
import ReptileForm from "./ReptileForm";
import { useUpdate } from "../../hooks";

interface Props {
  reptile: Reptile;
  open: boolean;
  onClose: (updated: boolean) => void;
}

export default function UpdateReptileModal({ reptile, open, onClose }: Props) {
  const [state, setState] = useState<ReptileCreation>({
    name: reptile.name,
    sex: reptile.sex,
    species: reptile.species,
  });

  const [updateReptile, { error }] = useUpdate<ReptileCreation, Reptile>(
    `/reptiles/${reptile.id}`
  );

  const onSubmit = () => {
    updateReptile(state).then(() => onClose(true));
  };

  return (
    <Modal
      open={open}
      title={`Edit ${reptile.name}`}
      onClose={() => onClose(false)}
      secondaryAction={() => onClose(false)}
      primaryButton="Save"
      primaryAction={onSubmit}
      centered
    >
      <ReptileForm
        value={state}
        onChange={setState}
        error={error}
        onSubmit={onSubmit}
      />
    </Modal>
  );
}
