import { Reptile } from "@prisma/client";
import { ErrorBanner, Modal } from "atomic-elements";
import { useState } from "react";
import { ReptileCreation } from "../../../../src/types";
import { useUpdate } from "../../lib/api";
import ReptileForm from "./ReptileForm";

interface Props {
  reptile: Reptile;
  open: boolean;
  onClose: (created: boolean) => void;
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
      title={`Update ${reptile.name}`}
      onClose={() => onClose(false)}
      secondaryAction={() => onClose(false)}
      primaryButton="Save"
      primaryAction={onSubmit}
    >
      <ReptileForm value={state} onChange={setState} error={error} />
    </Modal>
  );
}
