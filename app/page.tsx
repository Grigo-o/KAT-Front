import httpClient from "@/axios";
import HomeComponent from "./HomeComponent";

export default async function HomePage() {
  try {
    const response = await httpClient.get("/stops");
    const locations = response.data;
    return <HomeComponent locations={locations} />;
  } catch (error) {
    console.error("Error fetching stops:", error);
    return <div>Error fetching data</div>;
  }
}

// export default function HomePage() {
//   const locations = [
//     { id: 1, stop_name: "Kutaisi Airport" },
//     { id: 2, stop_name: "City Center" },
//     { id: 3, stop_name: "Tourism Center" },
//     { id: 4, stop_name: "Mall" },
//     { id: 5, stop_name: "KIU" },
//   ];

//   return <HomeComponent locations={locations} />;
// }
