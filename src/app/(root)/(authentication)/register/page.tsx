"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "../../../../firebaseConfig";
import { useRouter } from "next/navigation";
import LayoutHeaderOnly from "@/components/layout/LayoutDefault";
import { registerWithEmail } from "@/services";

export default function Register() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const response = await registerWithEmail({ firstName, lastName, email, password });
      router.push("/login");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('')
      setConfirmPassword('');
    }
  }

  return (
    <LayoutHeaderOnly>
      <main className="flex justify-center items-center h-[70vh] ">
        <form className="flex flex-col shadow p-8 rounded min-w-[50%]" onSubmit={handleSubmit} action="#">
          <h1 className="text-center text-xl">Register</h1>

          {error && (
            <div role="alert" className="error-box">
              <p>{error}</p>
            </div>
          )}

          <input type="text" name="firstName" className="inputField my-2" placeholder="First Name" required
            value={firstName} onChange={(e) => setFirstName(e.target.value)} />

          <input type="text" name="lastName" className="inputField my-2" placeholder="Last Name" required
            value={lastName} onChange={(e) => setLastName(e.target.value)} />

          <input type="email" name="email" className="inputField my-2" placeholder="Email" required
            value={email} onChange={(e) => setEmail(e.target.value)} />

          <input type="password" name="password" className="inputField my-2" placeholder="Password" required
            value={password} onChange={(e) => setPassword(e.target.value)} />

          <input type="password" name="confirmPassword" className="inputField my-2" placeholder="Confirm Password" required
            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

          <button type="submit" className="btn cta-btn mt-3">Register</button>

          <p className="text-sub-14 text-center mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-hsl-l5 dark:text-hsl-l85 hover:underline">Log In</Link>
          </p>
        </form>
      </main>
    </LayoutHeaderOnly>
  );
}
