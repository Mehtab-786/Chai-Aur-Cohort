import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@mono-repo-setup-learning/trpc";

export const trpc = createTRPCReact<AppRouter>();
