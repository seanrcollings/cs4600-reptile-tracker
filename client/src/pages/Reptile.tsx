import type { Reptile } from "@prisma/client";
import { Button, LoadingStatus, MaterialIcon } from "atomic-elements";
import { useParams } from "react-router";
import styled from "styled-components";
import FeedingsTable from "../components/feeding/FeedingsTable";
import HusbandryRecordTable from "../components/husbandyRecord/HusbandryRecordTable";
import UpdateReptileModal from "../components/reptile/UpdateReptileModal";
import ScheduleTable from "../components/schedule/ScheduleTable";
import { useBool, useQuery } from "../hooks";
import { sexName, speciesName } from "../lib/utils";
import { Card, Header, PageWrapper } from "../styles";

const InfoList = styled.ul`
  list-style-type: none;
  font-size: 1.5rem;
`;

export default function Reptile() {
  const { id } = useParams();
  const [edit, toggleEdit] = useBool(false);

  const { loading, error, data, refetch } = useQuery<{ reptile: Reptile }>(
    `/reptiles/${id}`
  );

  if (error || loading) {
    return (
      <LoadingStatus
        loading={true}
        error={error?.toString()}
        loadingMessage="Fetching Reptile information..."
      />
    );
  }

  return (
    <PageWrapper>
      <Header>
        <h1>Reptile: {data.reptile.name}</h1>
        <Button onClick={toggleEdit}>
          <MaterialIcon icon="edit" />
          Edit
        </Button>
      </Header>
      <UpdateReptileModal
        reptile={data.reptile}
        open={edit}
        onClose={(updated) => {
          toggleEdit();
          updated && refetch();
        }}
      />
      <div>
        <InfoList>
          <li>
            <strong>Species</strong>: {speciesName(data.reptile.species)}
          </li>
          <li>
            <strong>Sex</strong>: {sexName(data.reptile.sex)}
          </li>
        </InfoList>
      </div>
      <Card>
        <ScheduleTable reptileId={data.reptile.id} />
      </Card>
      <br />
      <Card>
        <FeedingsTable id={data.reptile.id} name={data.reptile.name} />
      </Card>
      <br />
      <Card>
        <HusbandryRecordTable id={data.reptile.id} name={data.reptile.name} />
      </Card>
    </PageWrapper>
  );
}
