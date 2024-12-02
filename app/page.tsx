"use client";

import { useState } from "react";
import { useTickets } from "./context/TicketsContext";
import { fetchCsrfToken } from "./utils/apiUtils";

export default function Home() {
  const locations = ["Kutaisi Airport", "Tourism Center", "KIU", "Mall", "City Center"];
  const ticketPrice = 10.50;
  const maxTickets = 3;

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(ticketPrice);


  const { tickets, fetchTickets } = useTickets();

  const handlePurchase = async () => {
    if (!from || !to) {
      alert("Please select both a departure and destination location.");
      return;
    }
    if (!date) {
      alert("Please select a date for your ticket.");
      return;
    }
    if (from === to) {
      alert("Departure and destination cannot be the same.");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      await fetchCsrfToken();

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/buy-ticket`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          schedule_id: 1, // replace with dynamic schedule id
          start_stop_id: locations.indexOf(from) + 1,
          end_stop_id: locations.indexOf(to) + 1,
          quantity,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        fetchTickets();
        alert(`Successfully purchased ${quantity} ticket(s) from ${from} to ${to} on ${date} for ₾${total}`);
      } else {
        alert(data.message || "Purchase failed.");
      }
    } catch (error) {
      console.error("Purchase error:", error);
      alert("An error occurred during purchase.");
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    setTotal(newQuantity * ticketPrice);
  };

  return (
    <div className="bg-gray-100">
      <div className="bg-[url('/kat.jpg')] bg-cover bg-center bg-no-repeat h-72 flex justify-center items-center w-full">
        <div className="w-5/6 h-1/2 bg-white rounded-xl px-8 py-4 flex items-center justify-between">
          <div className="flex justify-between mb-4">
            <div className="flex flex-col w-64 pr-2">
              <label htmlFor="from" className="mb-2 text-sm font-semibold">From:</label>
              <select
                id="from"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="border rounded p-2"
              >
                <option value="">Select Location</option>
                {locations.map((location, index) => (
                  <option key={index} value={location}>{location}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col w-64 pl-2">
              <label htmlFor="to" className="mb-2 text-sm font-semibold">To:</label>
              <select
                id="to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="border rounded p-2"
              >
                <option value="">Select Location</option>
                {locations.map((location, index) => (
                  <option key={index} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col w-50 justify-between mb-4">
            <label htmlFor="date" className="text-sm mb-2 font-semibold">Date:</label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border rounded py-1.5 px-2"
            />
          </div>
          <div className="flex flex-col w-64 justify-between mb-4">
            <label htmlFor="quantity" className="text-sm mb-2 font-semibold">Quantity:</label>
            <select
              id="quantity"
              value={quantity}
              onChange={(e) => handleQuantityChange(Number(e.target.value))}
              className="border rounded p-2"
            >
              {[...Array(maxTickets)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <span className="">Total :&nbsp;</span>
              <span className="font-semibold text-lg">{total}₾</span>
            </div>
            <button
              onClick={handlePurchase}
              className="bg-green-500 text-white flex items-center justify-center py-3 mt-2 rounded hover:bg-green-600"
            >
              Buy
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center p-5">
        <h2 className="text-3xl font-semibold mb-8 mt-2">Popular Tickets</h2>
        <div className="flex flex-col items-center w-full gap-y-6">
          {[
            { from: "Kutaisi Airport", to: "City Center", duration: "30 mins", price: "₾10" },
            { from: "Tourism Center", to: "Mall", duration: "45 mins", price: "₾15" },
            { from: "KIU", to: "Tourism Center", duration: "20 mins", price: "₾8" },
            { from: "City Center", to: "Mall", duration: "25 mins", price: "₾12" },
            { from: "Kutaisi Airport", to: "KIU", duration: "15 mins", price: "₾7" },
            { from: "Mall", to: "Tourism Center", duration: "35 mins", price: "₾14" },
          ].map((ticket, index) => (
            <div
              key={index}
              className="bg-white w-3/4 rounded-xl h-40 shadow-md flex flex-col justify-center py-4 px-8 duration-200 hover:shadow-lg"
            >
              <h1 className="text-xl font-bold mb-2">
                {ticket.from} ➡ {ticket.to}
              </h1>
              <p className="text-sm">
                <span className="font-semibold">Duration:</span> {ticket.duration}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Price:</span> {ticket.price}
              </p>
            </div>
          ))}
        </div>
      </div>


    </div>
  );
}
