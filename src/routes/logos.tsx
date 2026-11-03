import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/logos")({
  beforeLoad: () => {
    throw redirect({ to: "/brand/logos", statusCode: 301 });
  },
});
