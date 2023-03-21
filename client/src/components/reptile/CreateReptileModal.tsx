import { Reptile } from "@prisma/client";
import { ErrorBanner, Modal } from "atomic-elements";
import { useState } from "react";
import { ReptileCreation } from "../../../../src/types";
import { useCreate } from "../../lib/api";
import ReptileForm from "./ReptileForm";

interface Props {
  open: boolean;
  onClose: (created: boolean) => void;
}

const defaultValues = {
  name: "",
  sex: "m",
  species: "ball_python",
};

export default function CreateReptileModal({ open, onClose }: Props) {
  const [reptile, setReptile] = useState<ReptileCreation>(defaultValues);

  const [createReptile, { error }] = useCreate<ReptileCreation, Reptile>(
    "/reptiles"
  );

  const onSubmit = () => {
    createReptile(reptile).then(() => {
      onClose(true);
      setReptile(defaultValues);
    });
  };

  return (
    <Modal
      open={open}
      title="Create New Reptile"
      onClose={() => onClose(false)}
      secondaryAction={() => onClose(false)}
      primaryButton="Save"
      primaryAction={onSubmit}
    >
      {error && <ErrorBanner>{error}</ErrorBanner>}
      <ReptileForm value={reptile} onChange={setReptile} />
    </Modal>
  );
}
