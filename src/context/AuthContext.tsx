import React, { createContext, useState, useContext, ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {}, 
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    const savedToken = sessionStorage.getItem("token");
    return savedToken ? JSON.parse(savedToken) : null;
  });

  const updateToken = (newToken: string | null) => {
    setToken(newToken);
    if (newToken) {
      sessionStorage.setItem("token", JSON.stringify(newToken));
    } else {
      sessionStorage.removeItem("token");
    }
  };

  return (
    <AuthContext.Provider value={{ token, setToken: updateToken }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
