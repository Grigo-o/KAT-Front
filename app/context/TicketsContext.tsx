"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface Ticket {
    from: string;
    to: string;
    date: string;
    quantity: number;
    total: number;
}

interface TicketsContextValue {
    tickets: Ticket[];
    fetchTickets: () => void;
}

const TicketsContext = createContext<TicketsContextValue | undefined>(undefined);

interface TicketsProviderProps {
    children: ReactNode;
}

export function TicketsProvider({ children }: TicketsProviderProps) {
    const [tickets, setTickets] = useState<Ticket[]>([]);

    const fetchTickets = async () => {
        try {
            const token = localStorage.getItem("accessToken");

            if (!token) {
                console.log("User is not authenticated");
                return;
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-user-purchases`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (response.ok) {
                setTickets(data);
            } else {
                console.log(data.message || "Failed to fetch tickets");
            }
        } catch (error) {
            console.error("Error fetching tickets:", error);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    return (
        <TicketsContext.Provider value={{ tickets, fetchTickets }}>
            {children}
        </TicketsContext.Provider>
    );
}

export function useTickets(): TicketsContextValue {
    const context = useContext(TicketsContext);
    if (!context) {
        throw new Error("useTickets must be used within a TicketsProvider");
    }
    return context;
}
