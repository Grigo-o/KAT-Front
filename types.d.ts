type PlaceLocation = {
    id: number;
    stop_name: string;
    latitude: string;
    longitude: string;
    created_at: string;
    updated_at: string;
}

type Schedule = {
    [x: string]: string;
    id: number;
    bus_id: number;
    route_id: number;
    stop_id: number;
    arrival_time: string;
    departure_time: string;
    date: string;
}

type Route = {
    id: number;

}