import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/components")({
  beforeLoad: () => {
    throw redirect({ to: "/brand/components", statusCode: 301 });
  },
});
