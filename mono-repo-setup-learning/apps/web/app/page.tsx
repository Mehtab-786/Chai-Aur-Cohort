"use client";
import { useState } from "react";
import { createUserSchema } from "@mono-repo-setup-learning/utils";
import axios from "axios";
import type { SubmitEvent } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sucess, setSucess] = useState("");

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSucess("");

    const results = createUserSchema.safeParse({ name, email, password });

    if (!results.success) {
      const message = results.error.issues
        .map((issue) => issue.message)
        .join(", ");
      setError(message);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/users",
        results.data,
      );

      setSucess("User created successfully!");
    } catch (error) {
      console.error("Error creating user:", error);
      setError("Failed to create user.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        Web App
      </h1>
      <form onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          placeholder="Enter your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}
        {sucess && <p style={{ color: "green" }}>{sucess}</p>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
