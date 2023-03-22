import { Reptile, Schedule } from "@prisma/client";
import { LoadingStatus, Table } from "atomic-elements";
import { useQuery } from "../../hooks";

interface QueryData {
  schedules: (Schedule & { reptile?: Reptile })[];
}

type DayName =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

interface Props {
  path: string;
  includeName?: boolean;
}

function getTodaysName(): DayName {
  const date = new Date();
  return date
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase() as DayName;
}

export default function ScheduleTable({ path, includeName = false }: Props) {
  const { loading, error, data } = useQuery<QueryData>(path);

  const today = getTodaysName();
  const schedules = !data ? [] : data.schedules.filter((s) => s[today]);

  return (
    <div>
      <h2>Scheduled For Today</h2>
      <Table title="Schedules Table">
        <Table.Head style={{ textAlign: "left" }}>
          <Table.Row>
            <Table.Header>Type</Table.Header>
            <Table.Header>Description</Table.Header>
            {includeName && <Table.Header>Reptile</Table.Header>}
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
                <Table.Cell>{s.type}</Table.Cell>
                <Table.Cell>{s.description}</Table.Cell>
                {includeName && (
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
