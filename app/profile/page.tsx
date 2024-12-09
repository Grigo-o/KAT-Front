import httpClient from "@/axios"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import ProfileComponent from "./ProfileComponent"


export default async function Profile() {
    const c = await cookies()
    const token = c.get('access_token')?.value
    if (!token) {
        notFound()
    }
    const tickets = await httpClient.get('/user/tickets', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    const user = await httpClient.get('/current-user', {
        headers: {  
            Authorization: `Bearer ${token}`,
        },
    })
    return <div>

        <ProfileComponent tickets={tickets.data}  user={user.data}/>
    </div>
}
