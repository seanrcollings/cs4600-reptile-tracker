import { HusbandryRecord } from "@prisma/client";
import { Table, Button, MaterialIcon, LoadingStatus } from "atomic-elements";
import { useBool, useQuery } from "../../hooks";
import { fmtDate } from "../../lib/utils";
import { Header } from "../../styles";
import CreateHusbandryRecordModal from "./CreateHusbandryRecordModal";

interface Props {
  id: number;
  name: string;
}

export default function HusbandryRecordTable({ name, id }: Props) {
  const [create, toggleCreate] = useBool(false);
  const { loading, error, data, refetch } = useQuery<{
    husbandryRecords: HusbandryRecord[];
  }>(`/reptiles/${id}/husbandryRecords`);

  const lastRecord = data?.husbandryRecords[0];

  return (
    <div>
      <Header>
        <h2>{name}'s Husbandry Records</h2>
        <Button onClick={toggleCreate}>
          <MaterialIcon icon="add" />
          New Record
        </Button>
      </Header>

      <CreateHusbandryRecordModal
        open={create}
        reptileId={id}
        onClose={(created) => {
          toggleCreate();
          created && refetch();
        }}
        defaultValues={
          lastRecord && {
            humidity: lastRecord.humidity,
            length: lastRecord.length,
            temperature: lastRecord.length,
            weight: lastRecord.weight,
          }
        }
      />

      <Table title="Husbandry Record Table">
        <Table.Head style={{ textAlign: "left" }}>
          <Table.Row>
            <Table.Header>Date</Table.Header>
            <Table.Header style={{ textAlign: "right" }}>Weight</Table.Header>
            <Table.Header style={{ textAlign: "right" }}>
              Temperature
            </Table.Header>
            <Table.Header style={{ textAlign: "right" }}>Humidity</Table.Header>
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
            data?.husbandryRecords?.map((h) => (
              <Table.Row key={h.id}>
                <Table.Cell>{fmtDate(h.creatdAt)}</Table.Cell>
                <Table.Cell style={{ textAlign: "right" }}>
                  {h.weight}
                </Table.Cell>
                <Table.Cell style={{ textAlign: "right" }}>
                  {h.temperature}
                </Table.Cell>
                <Table.Cell style={{ textAlign: "right" }}>
                  {h.humidity}
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>
    </div>
  );
}
