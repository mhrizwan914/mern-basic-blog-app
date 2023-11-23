import React from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
    const [userInfo, setUserInfo] = React.useState(null);

    return (
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;