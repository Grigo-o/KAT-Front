"use client";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";
import httpClient from "@/axios";

export default function LogoutButton() {
    const router = useRouter();
    const { setUser } = useUser();

    const handleLogout = async () => {
        try {
            // Clear client-side storage
            localStorage.removeItem('access_token');
            localStorage.removeItem('user_id');
            // delete cookies
            document.cookie = `access_token=; path=/; max-age=0; secure; samesite=strict`;
            
            // Clear server-side cookie
            await httpClient.post('/logout');
            
            // Clear user context
            setUser(null);
            
            // Force a hard refresh to clear all client state
            window.location.href = '/login';
        } catch (error) {
            console.error("Error during logout:", error);
            // Still redirect even if the server logout fails
            window.location.href = '/login';
        }
    };

    return (
        <button 
            onClick={handleLogout}
            className="py-0 pl-10 flex text-white hover:text-gray-200 transition-colors"
        >
            <ion-icon name="log-out-outline" className="text-3xl"></ion-icon>
        </button>
    );
} 