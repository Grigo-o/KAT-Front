import httpClient from "@/axios";
import HomeComponent from "./HomeComponent";

export default async function HomePage() {
  const locations: PlaceLocation[] = (await httpClient.get('/stops')).data

  return <HomeComponent locations={locations} />
}
