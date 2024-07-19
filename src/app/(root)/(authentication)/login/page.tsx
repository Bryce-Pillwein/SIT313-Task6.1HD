"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInWithEmail } from "@/services";
import LayoutHeaderOnly from "@/components/layout/LayoutDefault";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");

    try {
      const status = await signInWithEmail({ email, password });
      if (!status.success) {
        setError(status.message);
        return;
      }

      const idToken = await status.credential!.user.getIdToken();

      await fetch("/api/login", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      router.push("/");
    } catch (e) {
      setError((e as Error).message);
    }
  }

  return (
    <LayoutHeaderOnly>
      <main className="flex min-h-[70vh] flex-col items-center justify-center">
        <form className="flex flex-col shadow p-8 rounded min-w-[50%]" onSubmit={handleSubmit} action="#" >
          <h1 className="text-center text-xl mb-4">Login</h1>

          {error && (
            <div role="alert" className="error-box">
              <p>{error}</p>
            </div>
          )}

          <input type="email" name="email" id="email" placeholder="Email" required
            className="inputField w-full rounded-lg py-4"
            value={email} onChange={(e) => setEmail(e.target.value)} />

          <input type="password" name="password" id="password" placeholder="password" required
            className="inputField w-full rounded-lg py-4 mt-3"
            value={password} onChange={(e) => setPassword(e.target.value)} />

          <button type="submit" className="btn cta-btn mt-3 w-full">Login</button>

          <p className="text-sub-14 text-center mt-5">
            Don't have an account?{" "}
            <Link href="/register" className="text-hsl-l5 dark:text-hsl-l85 hover:underline">Register</Link>
          </p>

        </form>
      </main>
    </LayoutHeaderOnly>
  );
}
