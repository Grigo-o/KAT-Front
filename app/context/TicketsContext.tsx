"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface Ticket {
    from: string;
    to: string;
    date: string;
    quantity: number;
    total: number;
}

interface TicketsContextValue {
    tickets: Ticket[];
    addTicket: (ticket: Ticket) => void;
}

const TicketsContext = createContext<TicketsContextValue | undefined>(undefined);

interface TicketsProviderProps {
    children: ReactNode;
}

export function TicketsProvider({ children }: TicketsProviderProps) {
    const [tickets, setTickets] = useState<Ticket[]>([]);

    const addTicket = (ticket: Ticket) => {
        setTickets((prevTickets) => [...prevTickets, ticket]);
    };

    return (
        <TicketsContext.Provider value={{ tickets, addTicket }}>
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
