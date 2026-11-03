import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/brand")({
  component: () => <Outlet />,
});
