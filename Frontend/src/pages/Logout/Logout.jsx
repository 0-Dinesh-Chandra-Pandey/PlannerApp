import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetData } from "../../store/slices/authSlice";

const Logout = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // CLEARING AUTHENTICATION DATA
        dispatch(resetData());
        localStorage.removeItem("AUTH_DATA");
        
        // CLEARING USER DATA
    }, []);

    return <div>Logout...</div>;
};

export default Logout;
