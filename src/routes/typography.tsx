import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/typography")({
  beforeLoad: () => {
    throw redirect({ to: "/brand/typography", statusCode: 301 });
  },
});
