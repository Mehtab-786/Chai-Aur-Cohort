import { Router } from "express";
import AuthenticationController from "./controller.js";
import { restrictToAuthenticatedUser } from "../middleware/authMiddlewares.js";
const authenticationController = new AuthenticationController();

export const authRouter = Router();

authRouter.post(
  "/sign-up",
  authenticationController.handleSignup.bind(authenticationController),
);

authRouter.post(
  "/sign-in",
  authenticationController.handleSignIn.bind(authenticationController),
);

authRouter.post(
  "/me",
  restrictToAuthenticatedUser,
  authenticationController.handleMe.bind(authenticationController)
);
