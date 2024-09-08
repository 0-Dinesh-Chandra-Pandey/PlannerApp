import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../store/slices/signupSlice";

const Signup = () => {
    const [showPass, setShowPass] = useState(false);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;

        dispatch(setUserInfo({ name, value }));
    };

    return (
        <div className="form-area">
            <div className="formBox">
                <label htmlFor="username">Name</label>
                <input
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    onChange={(e) => handleChange(e)}
                />
                <span className="icon">
                    <i className="ri-id-card-line"></i>
                </span>
            </div>
            <div className="formBox">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    placeholder="Enter your username"
                    name="username"
                    onChange={(e) => handleChange(e)}
                    autoComplete="username"
                />
                <span className="icon">
                    <i className="ri-user-3-line"></i>
                </span>
            </div>
            <div className="formBox">
                <label htmlFor="password">Password</label>
                <input
                    type={showPass ? "text" : "password"}
                    placeholder="Enter your password"
                    name="password"
                    onChange={(e) => handleChange(e)}
                    autoComplete="current-password"
                />
                <span className="icon" onClick={() => setShowPass(!showPass)}>
                    <i
                        className={showPass ? "ri-eye-line" : "ri-eye-off-line"}
                    ></i>
                </span>
            </div>
        </div>
    );
};

export default Signup;
