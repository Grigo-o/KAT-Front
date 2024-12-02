"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { fetchCsrfToken } from "../utils/apiUtils";

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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }
        try {
            await fetchCsrfToken();

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: form.email,
                    first_name: form.first_name,
                    last_name: form.last_name,
                    password: form.password,
                    password_confirmation: form.confirmPassword,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("Please verify your email via the validation link.");
            } else {
                setMessage(data.message || "Registration failed.");
            }
        } catch (error) {
            console.error(error);
            setMessage("An error occurred during registration.");
        }
    };

    return (
        <div className="flex items-center justify-center w-full h-full">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
            >
                <h1 className="text-2xl font-bold mb-4">Register</h1>
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
                <div className="flex justify-between">
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
