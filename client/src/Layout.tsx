import { Outlet } from "react-router";

type Props = {};

export default function Layout({}: Props) {
  return (
    <div>
      layout
      <Outlet />
    </div>
  );
}
