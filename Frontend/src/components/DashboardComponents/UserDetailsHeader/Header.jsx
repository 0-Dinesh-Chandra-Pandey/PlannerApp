import "./Header.css";
import userImage from "../../../assets/user.png";

const UserHeader = ({ name, username, loading }) => {
    return (
        <div className="header-container">
            <div className="user-info">
                <div className="user-image">
                    <img src={userImage} alt="" />
                </div>
                <div className="user-intro">
                    <h2> {loading ? <span id="name-loading"></span> : name}</h2>
                    <p>
                        {loading ? (
                            <span id="username-loading"></span>
                        ) : (
                            `@${username}`
                        )}
                    </p>
                </div>
            </div>

            <div className="logout">
                <a href="/logout">
                    <i className="ri-logout-box-r-line"></i> Logout
                </a>
            </div>
        </div>
    );
};

export default UserHeader;
