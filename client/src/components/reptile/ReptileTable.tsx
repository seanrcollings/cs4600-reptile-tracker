import { Reptile } from "@prisma/client";
import { Table, LoadingStatus, Button, MaterialIcon } from "atomic-elements";
import { useState } from "react";
import { useQuery } from "../../hooks";
import { Header } from "../../styles";
import CreateReptileModal from "./CreateReptileModal";
import ReptileRow from "./ReptileRow";

export default function ReptileTable() {
  const [openCreate, setOpenCreate] = useState(false);
  const { loading, error, data, refetch } = useQuery<{ reptiles: Reptile[] }>(
    "/reptiles"
  );

  return (
    <div>
      <Header>
        <h2>Your Reptiles</h2>
        <Button onClick={() => setOpenCreate(true)}>
          <MaterialIcon icon="add" />
          New Reptile
        </Button>
        <CreateReptileModal
          open={openCreate}
          onClose={(created) => {
            setOpenCreate(false);
            if (created) refetch();
          }}
        />
      </Header>

      <Table title="Reptile Table">
        <Table.Head style={{ textAlign: "left" }}>
          <Table.Row>
            <Table.Header>Name</Table.Header>
            <Table.Header>Species</Table.Header>
            <Table.Header>Sex</Table.Header>
            <Table.Header width={150} />
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {loading || error ? (
            <Table.Row style={{ position: "relative" }}>
              <Table.Cell colSpan={4} style={{ height: "200px" }}>
                <LoadingStatus
                  loading={loading}
                  error={error?.toString()}
                  loadingMessage="Fetching Reptile Information..."
                />
              </Table.Cell>
            </Table.Row>
          ) : (
            data?.reptiles?.map((r) => (
              <ReptileRow key={r.id} reptile={r} refetch={refetch} />
            ))
          )}
        </Table.Body>
      </Table>
    </div>
  );
}
