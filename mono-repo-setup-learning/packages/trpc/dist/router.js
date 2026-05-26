import { publicProcedure, router } from "./trpc.js";
export const appRouter = router({
    health: publicProcedure.query(() => {
        return {
            message: "Hello, world!",
        };
    }),
});
//# sourceMappingURL=router.js.map