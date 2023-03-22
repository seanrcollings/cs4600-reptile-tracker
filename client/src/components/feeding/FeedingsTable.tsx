import { Feeding, HusbandryRecord } from "@prisma/client";
import { Table, Button, MaterialIcon, LoadingStatus } from "atomic-elements";
import { useBool, useQuery } from "../../hooks";
import { fmtDate } from "../../lib/utils";
import { Header } from "../../styles";
import CreateFeedingModal from "./CreateFeedingModal";

interface Props {
  id: number;
  name: string;
}

export default function FeedingsTable({ name, id }: Props) {
  const [create, toggleCreate] = useBool(false);
  const { loading, error, data, refetch } = useQuery<{
    feedings: Feeding[];
  }>(`/reptiles/${id}/feedings`);

  return (
    <div>
      <Header>
        <h2>{name}'s Feedings</h2>
        <Button onClick={toggleCreate}>
          <MaterialIcon icon="add" />
          Record Feeding
        </Button>
      </Header>

      <CreateFeedingModal
        open={create}
        reptileId={id}
        onClose={(created) => {
          toggleCreate();
          created && refetch();
        }}
      />

      <Table title="Feedings Table">
        <Table.Head style={{ textAlign: "left" }}>
          <Table.Row>
            <Table.Header>Date</Table.Header>
            <Table.Header style={{ textAlign: "right" }}>
              Food Item
            </Table.Header>
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
            data?.feedings?.map((f) => (
              <Table.Row key={f.id}>
                <Table.Cell>{fmtDate(f.creatdAt)}</Table.Cell>
                <Table.Cell style={{ textAlign: "right" }}>
                  {f.foodItem}
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>
    </div>
  );
}
