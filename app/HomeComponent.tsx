"use client";

import { useEffect, useState } from "react";
import { useTickets } from "./context/TicketsContext";
import { fetchCsrfToken } from "./utils/apiUtils";
import httpClient from "@/axios";
import { getCsrf } from "./utils/auth";

export default function HomeComponent({
  locations,
}: {
  locations: PlaceLocation[];
}) {
  const maxTickets = 3;

  const [from, setFrom] = useState<PlaceLocation | undefined>(undefined);
  const [to, setTo] = useState<PlaceLocation | undefined>(undefined);
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [schedule, setSchedule] = useState<Schedule | undefined>(undefined);
  const [date, setDate] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState<number | undefined>(undefined);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [route, setRoute] = useState<Route | undefined>(undefined);
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

    if (!schedule) {
      alert("Please select a schedule.");
      return;
    }

    try {
      const token = localStorage.getItem("access_token");
      await getCsrf();
      const response = await httpClient.post(
        `/buy-ticket`,
        {
          schedule_id: schedule.id,
          start_stop_id: from.id,
          end_stop_id: to.id,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.data;
      if (response.status === 200) {
        fetchTickets();
        alert(
          `Successfully purchased ${quantity} ticket(s) from ${from} to ${to} on ${date} for ₾${total}`
        );
      } else {
        alert(data.message || "Purchase failed.");
      }
    } catch (error) {
      console.error("Purchase error:", error);
      alert("An error occurred during purchase.");
    }
  };

  const fetchRoutePrice = async (fromId: number, toId: number) => {
    if (!fromId || !toId || fromId === toId) return;
    setSchedule(undefined);
    try {
      const response = await httpClient.get(
        `/routes/from/${fromId}/to/${toId}`
      );
      const data = await response.data;
      setRoute(data);
      setPrice(data.price);
      setTotal(data.price * quantity);
      if (date !== "") {
        const schedulesRes = await httpClient.get(`/get-schedules`, {
          params: {
            route_id: data.id,
            date,
          },
        });
        const schedulesData = await schedulesRes.data;
        setSchedules(schedulesData);
      }
    } catch (error) {
      console.error("Route price error:", error);
      alert("An error occurred while fetching route price.");
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    if (!price) return;
    setTotal(newQuantity * price);
  };

  const fetchSchedules = async () => {
    if (route) {
      const schedulesRes = await httpClient.get(`/get-schedules`, {
        params: {
          route_id: route.id,
          date,
        },
      });
      const schedulesData = await schedulesRes.data;
      setSchedules(schedulesData);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [date]);

  return (
    <div className="bg-gray-100">
      <div>
        <div className="bg-[url('/kat2.jpg')] bg-cover bg-center bg-no-repeat h-96 flex flex-col items-center justify-between pb-4 pt-12 w-full">
          <div className="w-2/3 flex flex-col items-start">
            <h2 className="text-white text-4xl font-bold page-title mb-2">
              Book Affordable Tickets From Kutaisi Airport
            </h2>
            <h3 className="text-white text-2xl page-title">
              Easily find and compare the best bus tickets from Kutaisi Airport
              for your next journey.
            </h3>
          </div>
          <div
            className={`bg-white rounded-xl px-8 py-4 w-2/3 flex flex-col transition-all duration-300 ${schedules.length > 0 || (from && to && schedules.length === 0)
                ? "h-auto"
                : "h-1/3"
              }`}
          >
            <div className="h-full flex items-center gap-x-4 pt-2 pb-2 w-full">
              {/* Ticket Selection Components */}
              <div className="flex justify-between gap-x-4 w-2/5">
                <div className="flex flex-col w-1/2">
                  <select
                    id="from"
                    value={from?.id || ""}
                    onChange={(e) => {
                      const newLocation = locations.find(
                        (location) => location.id === parseInt(e.target.value)
                      );
                      setFrom(newLocation);
                      if (to && newLocation) {
                        fetchRoutePrice(newLocation.id, to.id);
                      }
                    }}
                    className="w-full border rounded p-2 h-12 bg-white text-gray-700 cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled hidden className="text-gray-400">
                      From
                    </option>
                    {locations.map((location, index) => (
                      <option
                        key={index}
                        value={location.id}
                        className="rounded text-gray-700 cursor-pointer"
                      >
                        {location.stop_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col w-1/2">
                  <select
                    id="to"
                    value={to?.id || ""}
                    onChange={(e) => {
                      const newLocation = locations.find(
                        (location) => location.id === parseInt(e.target.value)
                      );
                      setTo(newLocation);
                      if (from && newLocation) {
                        fetchRoutePrice(from.id, newLocation.id);
                      }
                    }}
                    className="w-full border rounded p-2 h-12 bg-white text-gray-700 cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled hidden className="text-gray-400">
                      To
                    </option>
                    {locations.map((location, index) => (
                      <option
                        key={index}
                        value={location.id}
                        className="rounded text-gray-700 cursor-pointer"
                      >
                        {location.stop_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* Date Selection */}
              <div className="flex flex-col w-1/5 justify-between">
                <input
                  id="date"
                  type="date"
                  value={date || "2024-12-07"}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border rounded h-12 px-2 bg-white text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />
              </div>
              {/* Quantity */}
              <div className="flex flex-col w-1/5 justify-between">
                <select
                  id="quantity"
                  value={quantity || ""}
                  onChange={(e) => handleQuantityChange(Number(e.target.value))}
                  className="w-full border rounded p-2 h-12 bg-white text-gray-700 cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled hidden className="text-gray-400">
                    Quantity
                  </option>
                  {[...Array(maxTickets)].map((_, i) => (
                    <option
                      key={i}
                      value={i + 1}
                      className="rounded text-gray-700 cursor-pointer"
                    >
                      <span className="mr-2">👤</span>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              {/* Total Price */}
              <div className="flex w-1/5 gap-x-4">
                <div className="">
                  <label htmlFor="total" className=""></label>
                  <input
                    id="total"
                    type="text"
                    value={`${total || 0}₾`}
                    disabled
                    className="bg-gray-100 border border-gray-300 px-2 h-12 w-full rounded focus:outline-none cursor-not-allowed"
                  />
                </div>
                {/* Buy Button */}
                <div className="flex">
                  <button
                    disabled={
                      !price || !total || !from || !to || !date || !schedule
                    }
                    onClick={async () => {
                      await handlePurchase();
                      window.location.href = '/profile';
                    }}
                    className="bg-orange-500 px-8 disabled:bg-gray-500 text-white flex items-center justify-center h-12 rounded hover:bg-orange-600"
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
            {/* Schedules Section */}
            {schedules.length > 0 && (
              <div className="border-t pt-6 pb-4 flex items-center gap-4 flex-wrap">
                {schedules.map((ss, index) => (
                  <div
                    key={ss.id}
                    className="flex items-center justify-between mb-2"
                  >
                    <button
                      onClick={() => setSchedule(ss)}
                      className={`flex flex-col items-start p-3 rounded-lg min-w-[200px] ${schedule?.id === ss.id
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                        }`}
                    >
                      <span className="font-semibold mb-1">{ss.bus_id}</span>
                      <div className="flex items-center gap-2 text-sm">
                        <span>🚌 {ss.departure_time}</span>
                        <span>➡</span>
                        <span>🏁 {ss.arrival_time}</span>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            )}
            {from && to && schedules.length === 0 && (
              <div className="border-t pt-6 pb-4">
                No schedules available for the selected date.
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center p-5">
        <h2 className="text-4xl mb-8 mt-2">Popular Tickets</h2>
        <div className="flex flex-col items-center w-full gap-y-6">
          {[
            {
              from: "Kutaisi Airport",
              to: "City Center",
              duration: "30 mins",
              price: "₾10",
              image: "center.jpeg",
            },
            {
              from: "Kutaisi Airport",
              to: "Mall",
              duration: "45 mins",
              price: "₾15",
              image: "mall.jpg",
            },
            {
              from: "KIU",
              to: "Kutaisi Airport",
              duration: "20 mins",
              price: "₾8",
              image: "kat.jpg",
            },
            {
              from: "Kutaisi Airport",
              to: "KIU",
              duration: "15 mins",
              price: "₾7",
              image: "kiu.jpg",
            },
            {
              from: "Kutaisi Airport",
              to: "Tourism Center",
              duration: "35 mins",
              price: "₾14",
              image: "tourism.jpg",
            },
          ].map((ticket, index) => (
            <div
              key={index}
              className="bg-white w-2/3 rounded-xl h-40 shadow-md flex justify-between items-center pl-6 pr-4 gap-4 duration-200 hover:shadow-lg cursor-pointer"
            >
              <div>
                <h1 className="text-xl font-bold mb-2">
                  {ticket.from} ➡ {ticket.to}
                </h1>
                <p className="text-sm">
                  <span className="font-semibold">Duration:</span>{" "}
                  {ticket.duration}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Price:</span> {ticket.price}
                </p>
              </div>
              <img
                src={ticket.image}
                alt={`${ticket.from} to ${ticket.to}`}
                className="w-2/5 h-5/6 object-cover bg-center bg-no-repeat rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="h-36 bg-blue-400 w-full mt-12 flex flex-col items-center justify-between py-8 px-16">
        <div className="flex items-center justify-center gap-x-8">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <ion-icon
              name="logo-instagram"
              className="text-white text-3xl"
            ></ion-icon>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <ion-icon
              name="logo-facebook"
              className="text-white text-3xl"
            ></ion-icon>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <ion-icon
              name="logo-twitter"
              className="text-white text-3xl"
            ></ion-icon>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <ion-icon
              name="logo-linkedin"
              className="text-white text-3xl"
            ></ion-icon>
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <ion-icon
              name="logo-youtube"
              className="text-white text-3xl"
            ></ion-icon>
          </a>
        </div>
        <p className="bg-none text-white">
          © {new Date().getFullYear()} Kutaisi Tickets. All rights reserved.
        </p>
      </div>
    </div>
  );
}
