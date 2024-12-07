"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { getCsrf } from "@/app/utils/auth";
import httpClient from "@/axios";


interface LoginFormState {
    email: string;
    password: string;
}

export default function Login() {
    const [form, setForm] = useState<LoginFormState>({ email: "", password: "" });
    const [message, setMessage] = useState<string>("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {

            await getCsrf();
            httpClient.post('/login', {
                email: form.email,
                password: form.password,
            })
                .then((apiResponse) => {
                    console.log(apiResponse.data);
                })
                .catch((error) => console.error(error));
        } catch (error) {
            console.error("Login error:", error);
            setMessage("An error occurred during login. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center w-full h-full">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
            >
                <h1 className="text-2xl font-bold mb-4">Login</h1>
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
                {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
