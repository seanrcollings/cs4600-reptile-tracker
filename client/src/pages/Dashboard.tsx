import { useNavigate } from "react-router";
import ReptileTable from "../components/reptile/ReptileTable";
import ScheduleTable from "../components/schedule/ScheduleTable";
import { Card, PageWrapper } from "../styles";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <h1>Dashboard</h1>
      <Card>
        <ScheduleTable />
      </Card>
      <br />
      <Card>
        <ReptileTable />
      </Card>
    </PageWrapper>
  );
}
