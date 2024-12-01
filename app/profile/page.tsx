"use client";

import { useTickets } from "../context/TicketsContext";


export default function Profile() {
    const { tickets } = useTickets();

    return (
        <div className="flex w-full h-full bg-gray-100 text-gray-900 p-5">
            <div className="w-1/4 max-w-2xl bg-white rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4">Profile</h1>
                <img src="https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg" className="rounded-full w-40 h-40" />
                <p className="text-lg mb-2">
                    <span className="font-semibold">Name:</span> John Doe
                </p>
                <p className="text-lg mb-2">
                    <span className="font-semibold">Email:</span> johndoe@example.com
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
                            <div key={index} className="bg-gray-100 p-5 rounded-xl shadow-md duration-200 hover:shadow-lg">
                                <h2 className="font-semibold">{ticket.from} ➡ {ticket.to}</h2>
                                <p>Date: {ticket.date}</p>
                                <p>Quantity: {ticket.quantity}</p>
                                <p>Total: ₾{ticket.total}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
