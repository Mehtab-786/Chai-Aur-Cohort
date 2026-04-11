import express from "express";
import { authRouter } from "./auth/routes.js";
import { authenticationMiddleware } from "./middleware/authMiddlewares.js";

export function createApplication() {
  const app = express();

  //middlewares

  app.use(express.json());



  app.use("/auth", authRouter);

  app.use(authenticationMiddleware())

  //routres
  app.get("/", (req, res) => {
    return res.json({
      message: "only checking routes ",
    });
  });

  return app;
}
