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

type Ticket = {
    ticket_id: number;
    purchase_id: number;
    schedule_id: number;
    route_name: string;
    price: string;
    departure_time: string;
    departure_date: string;
}

type User = {

    id: number;
    email: string;
    first_name: string;
    last_name: string;
    email_verified_at: string;
    is_admin: number;
    verification_token: string;
    created_at: string;
    updated_at: string;

}