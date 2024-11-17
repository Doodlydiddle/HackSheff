import { createContext, useContext, useState } from "react";

// Create context for username
const UsernameContext = createContext();

export const useUsername = () => {
    return useContext(UsernameContext);
};

export const UsernameProvider = ({ children }) => {
    const [username, setUsername] = useState(null);

    const updateUsername = (newUsername) => {
        setUsername(newUsername);
    };

    return (
        <UsernameContext.Provider value={{ username, updateUsername }}>
            {children}
        </UsernameContext.Provider>
    );
};
