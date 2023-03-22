import { Reptile, Schedule } from "@prisma/client";
import { Button, LoadingStatus, MaterialIcon, Table } from "atomic-elements";
import { useBool, useQuery } from "../../hooks";
import { getTodaysName, sentenceCase } from "../../lib/utils";
import { Header } from "../../styles";
import CreateScheduleModal from "./CreateScheduleModal";

interface QueryData {
  schedules: (Schedule & { reptile?: Reptile })[];
}

interface Props {
  reptileId?: number;
}

export default function ScheduleTable({ reptileId }: Props) {
  const [create, toggleCreate] = useBool(false);

  const path = reptileId
    ? `/reptiles/${reptileId}/schedules` // Specific Reptile
    : "/users/schedules "; // All Schedules for the user
  const { loading, error, data, refetch } = useQuery<QueryData>(path);

  const today = getTodaysName();
  const schedules = !data ? [] : data.schedules.filter((s) => s[today]);

  return (
    <div>
      <Header>
        <h2>Scheduled For Today</h2>
        {reptileId && (
          <Button onClick={toggleCreate}>
            <MaterialIcon icon="add" />
            Add Schedule
          </Button>
        )}
      </Header>
      {reptileId && (
        <CreateScheduleModal
          open={create}
          reptileId={reptileId}
          onClose={(created) => {
            toggleCreate();
            created && refetch();
          }}
        />
      )}
      <Table title="Schedules Table">
        <Table.Head style={{ textAlign: "left" }}>
          <Table.Row>
            <Table.Header>Type</Table.Header>
            <Table.Header>Description</Table.Header>
            {!reptileId && <Table.Header>Reptile</Table.Header>}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {loading || error ? (
            <Table.Row style={{ position: "relative" }}>
              <Table.Cell colSpan={4} style={{ height: "200px" }}>
                <LoadingStatus
                  loading={loading}
                  error={error?.toString()}
                  loadingMessage="Fetching Schedules"
                />
              </Table.Cell>
            </Table.Row>
          ) : (
            schedules.map((s) => (
              <Table.Row key={s.id}>
                <Table.Cell>{sentenceCase(s.type)}</Table.Cell>
                <Table.Cell>{s.description}</Table.Cell>
                {!reptileId && (
                  <Table.Cell>{s.reptile ? s.reptile.name : "-"}</Table.Cell>
                )}
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>
    </div>
  );
}
