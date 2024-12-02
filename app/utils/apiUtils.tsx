export const fetchCsrfToken = async () => {
    try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`, {
            credentials: "include",
        });
    } catch (error) {
        console.error("Error fetching CSRF token:", error);
        throw new Error("Failed to fetch CSRF token.");
    }
};
