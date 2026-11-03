import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/homepage")({
  beforeLoad: () => {
    throw redirect({ to: "/", statusCode: 301 });
  },
});
