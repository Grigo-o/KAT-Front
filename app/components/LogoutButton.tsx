import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";

export default function LogoutButton() {
    const router = useRouter();
    const { fetchUser } = useUser();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_id');
        fetchUser(); // This will update the user context to null
        router.push('/login');
    };

    return (
        <button 
            onClick={handleLogout}
            className="py-0 pl-10 flex text-white hover:text-gray-200 transition-colors"
        >
            {/* <ion-icon name="log-out-outline" className="text-3xl"></ion-icon> */}
        </button>
    );
} 