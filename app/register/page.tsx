"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { fetchCsrfToken } from "../utils/apiUtils";
import { getCsrf } from "@/app/utils/auth";
import httpClient from "@/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface FormState {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const [form, setForm] = useState<FormState>({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await getCsrf();
      httpClient
        .post("/register", {
          email: form.email,
          first_name: form.first_name,
          last_name: form.last_name,
          password: form.password,
          password_confirmation: form.confirmPassword,
        })
        .then((apiResponse) => {
          console.log(apiResponse.data);
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error(error);
      setMessage("An error occurred during registration.");
    }

    // if (form.password !== form.confirmPassword) {
    //     setMessage("Passwords do not match.");
    //     return;
    // }
    // try {
    //     // await fetchCsrfToken();
    //     // Step 1: Fetch CSRF cookie
    //     await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`, {
    //         method: "GET",
    //         credentials: "include", // Ensures cookies are included
    //     });

    //     const cookies = document.cookie
    //         .split('; ')
    //         .find((row) => row.startsWith('XSRF-TOKEN='))
    //         ?.split('=')[1];

    //     console.log(cookies);

    //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
    //         method: "POST",
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //             'X-XSRF-TOKEN': cookies || '',
    //         },
    //         credentials: 'include', // Ensure cookies are sent
    //         body: JSON.stringify({
    //             email: form.email,
    //             name: form.first_name,
    //             password: form.password,
    //             password_confirmation: form.confirmPassword,
    //         }),
    //     });

    //     const data = await response.json();
    //     if (response.ok) {
    //         setMessage("Please verify your email via the validation link.");
    //     } else {
    //         setMessage(data.message || "Registration failed.");
    //     }
    // } catch (error) {
    //     console.error(error);
    //     setMessage("An error occurred during registration.");
    // }
  };

  return (
    <div className="flex items-center justify-center w-full h-full bg-[url('/kat.jpg')] bg-cover bg-center bg-no-repeat">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
      >
        <h1 className="text-3xl mb-4">Register</h1>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div className="flex justify-between gap-x-4">
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">First Name</label>
            <input
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        {message && <p className="text-red-500 text-sm mb-4">{message}</p>}
        <p className="text-sm mb-4">
          Already have an Account?{" "}
          <Link
            href="/login"
            className="text-blue-500"
            onClick={() => router.push("/login")}
          >
            Log In
          </Link>
        </p>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
}
