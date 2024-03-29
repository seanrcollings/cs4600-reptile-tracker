import { Reptile } from "@prisma/client";
import { Table, IconButton, ConfirmationModal } from "atomic-elements";
import { useBool, useDelete } from "../../hooks";
import styled from "styled-components";
import UpdateReptileModal from "./UpdateReptileModal";
import * as util from "../../lib/utils";
import { Link } from "react-router-dom";

const Spacer = styled.span`
  margin-right: 10px;
`;

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
        <Table.Cell>
          <Link to={`/reptile/${reptile.id}`}>{reptile.name}</Link>
        </Table.Cell>
        <Table.Cell>{util.speciesName(reptile.species)}</Table.Cell>
        <Table.Cell>{util.sexName(reptile.sex)}</Table.Cell>
        <Table.Cell>
          <Spacer>
            <IconButton
              icon="edit"
              ariaLabel="Edit Reptile"
              onClick={toggleUpdate}
            />
          </Spacer>
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
