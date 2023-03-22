import { Reptile } from "@prisma/client";
import { Button, PopupModal, TextInput } from "atomic-elements";
import { useState } from "react";
import { ReptileCreation } from "../../../../src/types";
import { useCreate } from "../../hooks";
import { Form } from "../../styles";

interface Props {
  reptileId: number;
  open: boolean;
  onClose: (created: boolean) => void;
}

export default function CreateFeedingModal({
  reptileId,
  open,
  onClose,
}: Props) {
  const [foodItem, setFoodItem] = useState<string>("");

  const [createFoodItem, { error }] = useCreate(
    `/reptiles/${reptileId}/feedings`
  );

  const onSubmit = () => {
    createFoodItem({ foodItem }).then(() => {
      onClose(true);
      setFoodItem("");
    });
  };

  return (
    <PopupModal
      open={open}
      title="What Did They Eat?"
      actions={[
        <Button variant="secondary" key="cancel" onClick={() => onClose(false)}>
          Cancel
        </Button>,
        <Button key="save" onClick={onSubmit}>
          Save
        </Button>,
      ]}
      onOutsideClick={() => onClose(false)}
      centered
    >
      <Form onSubmit={onSubmit}>
        <TextInput
          label="Food Item"
          value={foodItem}
          onChange={setFoodItem}
          error={error?.get("/foodItem")}
          hideLabel
          placeholder="Mouse"
        />
      </Form>
    </PopupModal>
  );
}
