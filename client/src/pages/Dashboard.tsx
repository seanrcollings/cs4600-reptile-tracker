import { useNavigate } from "react-router";
import styled from "styled-components";
import ReptileTable from "../components/reptile/ReptileTable";

const DashboardWrapper = styled.div`
  margin: auto;
  width: 1000px;
`;

const Card = styled.div`
  border: 1px solid lightgrey;
  border-radius: 10px;
  padding: 10px;
  height: 500px;
  overflow-y: auto;
`;

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <DashboardWrapper>
      <h1>Dashboard</h1>
      <Card>
        <ReptileTable />
      </Card>
    </DashboardWrapper>
  );
}
