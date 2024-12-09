import httpClient from "@/axios"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import ProfileComponent from "./ProfileComponent"

export default async function Profile() {
    const c = await cookies()
    const token = c.get('access_token')?.value
    
    if (!token) {
        redirect('/login')
    }

    try {
        const [tickets, user] = await Promise.all([
            httpClient.get('/user/tickets', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            httpClient.get('/current-user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },  
            })
        ]);

        return (
            <div>
                <ProfileComponent tickets={tickets.data} user={user.data} />
            </div>
        );
    } catch (error) {
        console.error("Error fetching profile data:", error);
        redirect('/login');
    }
}
