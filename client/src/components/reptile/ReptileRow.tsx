import { Reptile } from "@prisma/client";
import { Table, IconButton, ConfirmationModal } from "atomic-elements";
import { useBool } from "../../hooks";
import { useDelete } from "../../lib/api";
import UpdateReptileModal from "./UpdateReptileModal";
import * as reptileUtil from "../../lib/reptile";

interface ReptileRowProps {
  reptile: Reptile;
  refetch: () => void;
}

export default function ReptileRow({ reptile, refetch }: ReptileRowProps) {
  const [deleteReptile] = useDelete(`/reptiles/${reptile.id}`);
  const [update, toggleUpdate] = useBool(false);
  const [confirm, toggleConfirm] = useBool(false);

  return (
    <>
      <UpdateReptileModal
        reptile={reptile}
        open={update}
        onClose={(updated) => {
          toggleUpdate();
          if (updated) {
            refetch();
          }
        }}
      />
      <ConfirmationModal
        open={confirm}
        title="Are You Sure?"
        confirmText="Delete"
        onReject={toggleConfirm}
        onConfirm={() => {
          toggleConfirm();
          deleteReptile().then(refetch);
        }}
      >
        <p>
          Are you sure you want to delete <strong>{reptile.name}</strong>? This
          action is non-reversible
        </p>
      </ConfirmationModal>
      <Table.Row>
        <Table.Cell>{reptile.name ? reptile.name : "-"}</Table.Cell>
        <Table.Cell>{reptileUtil.speciesName(reptile.species)}</Table.Cell>
        <Table.Cell>{reptileUtil.sexName(reptile.sex)}</Table.Cell>
        <Table.Cell>
          <IconButton
            icon="edit"
            ariaLabel="Edit Reptile"
            onClick={toggleUpdate}
          />
          <IconButton
            icon="delete"
            ariaLabel="Delete Reptile"
            onClick={toggleConfirm}
          />
        </Table.Cell>
      </Table.Row>
    </>
  );
}
