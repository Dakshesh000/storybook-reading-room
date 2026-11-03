import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/colors")({
  beforeLoad: () => {
    throw redirect({ to: "/brand/colours", statusCode: 301 });
  },
});
