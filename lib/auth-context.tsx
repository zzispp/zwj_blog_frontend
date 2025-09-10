"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
    address: string;
    name?: string;
}

interface AuthContextType {
    user: User | null;
    login: (address: string) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 从 localStorage 恢复登录状态
        const savedUser = localStorage.getItem("solana-auth-user");
        if (savedUser) {
            try {
                const userData = JSON.parse(savedUser);
                setUser(userData);
                // 设置 cookie 以便中间件可以访问
                document.cookie = `solana-auth-user=${JSON.stringify(userData)}; path=/; max-age=${7 * 24 * 60 * 60}`; // 7天
            } catch (error) {
                localStorage.removeItem("solana-auth-user");
                document.cookie = "solana-auth-user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }
        }
        setIsLoading(false);
    }, []);

    const login = (address: string) => {
        const userData = {
            address,
            name: `Solana User ${address.slice(0, 8)}...`,
        };
        setUser(userData);
        localStorage.setItem("solana-auth-user", JSON.stringify(userData));
        // 设置 cookie 以便中间件可以访问
        document.cookie = `solana-auth-user=${JSON.stringify(userData)}; path=/; max-age=${7 * 24 * 60 * 60}`; // 7天
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("solana-auth-user");
        // 删除 cookie
        document.cookie = "solana-auth-user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
