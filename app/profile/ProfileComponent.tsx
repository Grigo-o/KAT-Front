"use client";

import { useEffect, useState } from "react";
import httpClient from "@/axios";




export default function ProfileComponent({
    tickets,
    user
}: {
    tickets: Ticket[];
    user: User;
}) {
    // const [tickets, setTickets] = useState<Ticket[]>([]);


    // const fetchTickets = async () => {
    //     try {
    //         const token = localStorage.getItem("access_token");

    //         if (!token) {
    //             console.log("User is not authenticated");
    //             return;
    //         }

    //         const response = await httpClient.get('/user/tickets', {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });

    //         if (response.status === 200) {
    //             setTickets(response.data);
    //         } else {
    //             console.log("Failed to fetch tickets");
    //         }
    //     } catch (error) {
    //         console.error("Error fetching tickets:", error);
    //     }
    // };

    return (
        <div className="flex w-full h-full bg-gray-100 text-gray-900 p-5">
            <div className="w-1/4 max-w-2xl bg-white rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4">Profile</h1>
                <img
                    src="https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg"
                    className="rounded-full w-40 h-40"
                    alt="Profile"
                />
                <p className="text-lg mb-2">
                    <span className="font-semibold">Name:</span> {user.first_name} {user.last_name}
                </p>
                <p className="text-lg mb-2">
                    <span className="font-semibold">Email:</span> {user.email}
                </p>
            </div>
            <span className="h-full w-px mx-5 bg-gray-400"></span>
            <div className="w-3/4 bg-white rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4">Purchased Tickets</h1>
                <div className="flex flex-col gap-y-5">
                    {tickets.length === 0 ? (
                        <p>No tickets purchased yet.</p>
                    ) : (
                        tickets.map((ticket, index) => (
                            <div
                                key={index}
                                className="bg-gray-100 p-5 rounded-xl shadow-md duration-200 hover:shadow-lg"
                            >
                                <h2 className="font-semibold">{ticket.route_name} </h2>
                                <p>Date: {ticket.departure_date} {ticket.departure_time}</p>
                                {/* <p>Quantity: {ticket.}</p> */}
                                <p>Price: ₾{ticket.price}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
