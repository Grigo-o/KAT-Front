"use client";

import { useState, ChangeEvent, FormEvent } from "react";

interface FormState {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
}

export default function Register() {
    const [form, setForm] = useState<FormState>({
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
    });
    const [message, setMessage] = useState<string>("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }
        if (form.password.length < 6) {
            setMessage("Password must be at least 6 characters.");
            return;
        }
        setMessage("Please verify your email via the validation link.");
        // Api call 
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
                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
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
