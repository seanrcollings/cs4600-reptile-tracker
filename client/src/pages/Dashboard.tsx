import { useNavigate } from "react-router";
import styled from "styled-components";
import ReptileTable from "../components/reptile/ReptileTable";
import ScheduleTable from "../components/schedule/ScheduleTable";

const DashboardWrapper = styled.div`
  margin: auto;
  width: 1000px;
`;

const Card = styled.div`
  border: 1px solid lightgrey;
  border-radius: 10px;
  padding: 10px;
  height: 400px;
  overflow-y: auto;
`;

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <DashboardWrapper>
      <h1>Dashboard</h1>
      <Card>
        <ScheduleTable />
      </Card>
      <br />
      <Card>
        <ReptileTable />
      </Card>
    </DashboardWrapper>
  );
}
