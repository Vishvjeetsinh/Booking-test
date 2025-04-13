import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { PageLoader } from "../components/ui/loader";

const PrivateRoute = ({ children }) => {

    const navigate = useNavigate();
    const [loader, setLoader] = useState(true)
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token || token === 'undefined') {
            navigate("/login")
        } 
        
        setLoader(false)
    }, [])

    return loader ? <PageLoader / >
        :
        <>
            <div className="dashboard-sec">
                {children}
            </div>
        </>
}

export default PrivateRoute