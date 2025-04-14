import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        navigate(token ? "/booking" : "/login");
    }, [navigate]);

    return null; // no UI here
}
