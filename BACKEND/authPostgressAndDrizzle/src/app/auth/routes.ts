import { Router } from "express";
import AuthenticationController from "./controller.js";
const authenticationController = new AuthenticationController();

export const authRouter = Router();

authRouter.post(
  "/sign-up",
  authenticationController.handleSignup.bind(authenticationController),
);
