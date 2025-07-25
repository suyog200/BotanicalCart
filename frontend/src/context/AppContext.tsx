import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Define the context type
interface AppContextType {
    navigate: ReturnType<typeof useNavigate>; //keeping the type as AppContextProvider will be used within BrowserRouter
    user: any; // Replace 'any' with a more specific type if available
    setUser: (user: any) => void; // Replace 'any' with a more specific type if available
    seller: boolean;
    setIsSeller: (seller: boolean) => void;
    showUserLogin?: boolean;
    setShowUserLogin?: (show: boolean) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children } : { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [seller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);

    const value = { navigate, user, setUser, seller, setIsSeller, showUserLogin, setShowUserLogin };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
};    

export const useAppContext = () => {
    return useContext(AppContext);
};