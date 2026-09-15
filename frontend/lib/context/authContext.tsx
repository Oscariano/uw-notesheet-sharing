import {createContext, useContext, useState, type ReactNode} from "react";

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (newToken: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [token, setToken] = useState(localStorage.getItem("knox_token"));

    const login = (newToken: string) => {
        localStorage.setItem('knox_token', newToken);
        setToken(newToken);
    }

    const logout = () => {
        localStorage.removeItem('knox_token');
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{token, isAuthenticated: !!token, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}