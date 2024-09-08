import { useEffect, useRef, useState } from "react";
import Login from "../../components/Login/Login";
import Signup from "../../components/Signup/Signup";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { createUserAccount } from "../../store/slices/signupSlice";
import { checkUserLogin } from "../../store/slices/loginSlice";
import Loading from "../../components/LoadingScreen/Loading";
import { setAuthData } from "../../store/slices/authSlice";
import frontPageImage from "../../assets/graphicTwo.png";

const Home = () => {
    const graphics = useRef();
    const [isNewUser, setIsNewUser] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const dispatch = useDispatch();
    const signupData = useSelector((state) => state.signupData);
    const loginData = useSelector((state) => state.loginData);

    const handleClick = (e) => {
        e.preventDefault();
        
        // Toggle between login and signup
        if (isNewUser) {
            dispatch(createUserAccount(signupData));
        } else {
            dispatch(checkUserLogin(loginData));
        }
        
    };
    
    useEffect(() => {
        // Showing user the errror message while login
        if (loginData.error) {
            const message = loginData.error.extraDetails || loginData.error.message;
            setErrorMessage(message)
        }
        
        // Showing user the errror message while signup
        if (signupData.error) {
            const message = signupData.error.extraDetails || signupData.error.message;
            setErrorMessage(message);
        }
        
        const data = JSON.parse(localStorage.getItem("AUTH_DATA"));
        dispatch(setAuthData(data));
    }, [loginData, signupData])
    
    
    // TOGGLING THE FORM
    const handleFormToggle = () => {
        setIsNewUser(!isNewUser);
    }

    return (
        <>
            {/* LOADER */}
            {
                signupData.loading || loginData.loading && <Loading />
            }
            
            {/* MAIN CONTENT (LOGIN AND SIGNUP) */}
            <div className="home-wrapper">
                <div className="container">
                    <div className="graphics" ref={graphics}>
                        <img src={frontPageImage} alt="" />
                        <img src="./assets/graphicTwo.png" alt="" />
                    </div>
                    <div className="form">
                        <form>
                            <h1>{isNewUser ? "Signup" : "Login"}</h1>
                            {
                                <div id="error-message">{errorMessage}</div>
                            }
                            {/* MAIN FORM */}
                            {isNewUser ? <Signup /> : <Login />}

                            <div
                                className="infoArea"
                                onClick={() => handleFormToggle()}
                            >
                                {isNewUser ? (
                                    <p>Already have account? Login</p>
                                ) : (
                                    <p>Don't have account? Signup</p>
                                )}
                            </div>

                            <div className="formButton">
                                <button onClick={(e) => handleClick(e)}>
                                    {isNewUser ? "Signup" : "Login"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
