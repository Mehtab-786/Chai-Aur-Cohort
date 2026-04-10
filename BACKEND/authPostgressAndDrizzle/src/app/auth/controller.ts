import type { Request, Response } from "express";
import { signupPayload } from "./models.js";

class AuthenticationController {
  public async handleSignup(req: Request, res: Response) {
    const validattionResult = await signupPayload.safeParseAsync(req.body);
    if (validattionResult.error)
      return res.status(400).json({
        message: "body validation failed",
        error: validattionResult.error,
      });

    const {email, firstName,password,lastName} = validattionResult.data
  }
}

export default AuthenticationController;
