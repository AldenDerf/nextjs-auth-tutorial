"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });

  async function handleLogin(e: React.FormEvent) {
    await signIn("credentials", {
      email: form.email,
      password: form.password,
      callbackUrl: "/dashboard",
    });
  }

  return (
    <div className="max-w-sm mx-auto mt-20">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-2">
            <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value})} />
            <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value})} />
            <button className="bg-green-500 text-white py-2">Login</button>
        </form>
    </div>
  )
}
