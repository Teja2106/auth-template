'use client';

import React, { createContext, useContext } from "react";

type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
} | undefined | null;

const UserContext = createContext<User>(undefined);

export function UserProvider({ value, children }: { value: User, children: React.ReactNode }) {
    return <UserContext.Provider value={value}>{ children }</UserContext.Provider>
}

export function useUser() {
    return useContext(UserContext);
}