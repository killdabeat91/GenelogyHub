import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const USERS = [
    { id: 1, username: 'admin', password: 'admin', name: 'Admin', role: 'admin' },
    { id: 2, username: 'member', password: '1234', name: 'Nguyễn Văn G', role: 'member' },
];

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('gia-pha-user');
        return saved ? JSON.parse(saved) : null;
    });

    const login = (username, password) => {
        const found = USERS.find(u => u.username === username && u.password === password);
        if (found) {
            const userData = { id: found.id, name: found.name, role: found.role, username: found.username };
            setUser(userData);
            localStorage.setItem('gia-pha-user', JSON.stringify(userData));
            return { success: true };
        }
        return { success: false, error: 'Sai tên đăng nhập hoặc mật khẩu' };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('gia-pha-user');
    };

    const isAdmin = user?.role === 'admin';

    return (
        <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
