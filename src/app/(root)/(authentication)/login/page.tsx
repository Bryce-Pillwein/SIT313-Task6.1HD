"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInWithEmail } from "@/services";
import LogoTextRotate from "@/components/ui/LogoTextRotate";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");

    try {
      console.log("Firebase Config:", {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY
      });

      const status = await signInWithEmail({ email, password });
      if (!status.success) {
        setError(status.message);
        return;
      }

      const idToken = await status.credential!.user.getIdToken();

      const response = await fetch("/api/login", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      if (!response.ok) {
        console.log("RESPONSE FAILED");
      }


      router.push("/");
    } catch (e) {
      setError((e as Error).message);
    }
  }

  return (
    <main className="flex min-h-[100vh] flex-col items-center justify-center px-4">

      <LogoTextRotate />

      <form onSubmit={handleSubmit} action="#"
        className="flex flex-col shadow p-8 rounded w-[100%] sm:w-[80%] md:w-[50%] bg-hsl-l100 dark:bg-hsl-l13 mt-16">
        <h1 className="text-center text-xl mb-4">Login</h1>

        {error && (
          <div role="alert" className="error-box">
            <p>{error}</p>
          </div>
        )}

        <input type="email" name="email" id="email" placeholder="Email" required
          className="inputField w-full rounded-lg py-4"
          value={email} onChange={(e) => setEmail(e.target.value)} />

        <input type="password" name="password" id="password" placeholder="Password" required
          className="inputField w-full rounded-lg py-4 mt-3"
          value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="submit" className="btn cta-btn mt-3 w-full">Login</button>

        <p className="text-sub-14 text-center mt-5">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-hsl-l5 dark:text-hsl-l85 hover:underline">Register</Link>
        </p>

      </form>
    </main>
  );
}
