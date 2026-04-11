import type { Request, Response } from "express";
import { signinPayload, signupPayload } from "./models.js";
import { db } from "../../db/index.js";
import { userTable } from "../../db/schema.js";
import { eq } from "drizzle-orm";
import { createHmac, randomBytes } from "node:crypto";
import { createToken, type userTokenPayload } from "./utils/token.js";

class AuthenticationController {
  public async handleSignup(req: Request, res: Response) {
    const validattionResult = await signupPayload.safeParseAsync(req.body);
    if (validattionResult.error)
      return res.status(400).json({
        message: "body validation failed",
        error: validattionResult.error,
      });

    const { email, firstName, password, lastName } = validattionResult.data;

    const userEmailResult = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email));

    if (userEmailResult.length > 0)
      return res
        .status(400)
        .json({ error: "duplicate entry", message: "Email already exists" });

    const salt = randomBytes(32).toString("hex");
    const hash = createHmac("sha256", salt).update(password).digest("hex");

    const [result] = await db
      .insert(userTable)
      .values({
        firstName,
        lastName,
        email,
        salt,
        password: hash,
      })
      .returning({ id: userTable.id });

    return res
      .status(201)
      .json({ message: "user has been succesfully", data: { id: result?.id } });
  }
  public async handleSignIn(req: Request, res: Response) {
    const validattionResult = await signinPayload.safeParseAsync(req.body);

    if (validattionResult.error)
      return res.status(400).json({
        message: "body validation failed",
        error: validattionResult.error,
      });

    const { email, password } = validattionResult?.data;

    const [userSelect] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email));
    if (!userSelect)
      return res.status(400).json({ message: "email does not exists" });

    const salt = userSelect.salt!;
    const hash = createHmac("sha256", salt).update(password).digest("hex");

    if (userSelect.password !== hash)
      return res.status(400).json({ message: "email or password is wrong " });

    const token = createToken({ id: userSelect.id });

    return res
      .status(200)
      .json({ message: "sign-in success", data: { token } });
  }
  public async handleMe(req: Request, res: Response) {
    // @ts-ignore
    const { id } = req.user! as userTokenPayload;

    const [userResult] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, id));

    return res.json({
      firstName: userResult?.firstName,
      lastName: userResult?.lastName,
      email: userResult?.email,
    });
  }
}

export default AuthenticationController;
