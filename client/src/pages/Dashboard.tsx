import { useNavigate } from "react-router";
import styled from "styled-components";
import ReptileTable from "../components/reptile/ReptileTable";
import ScheduleTable from "../components/schedule/ScheduleTable";
import { useApi } from "../hooks";
import { Card, PageWrapper } from "../styles";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <h1>Dashboard</h1>
      <Card>
        <ScheduleTable path="/users/schedules" includeName />
      </Card>
      <br />
      <Card>
        <ReptileTable />
      </Card>
    </PageWrapper>
  );
}
