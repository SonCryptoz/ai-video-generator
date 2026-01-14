"use client";

import { createContext } from "react";

export type UserDetails = {
    id?: number;
    name?: string;
    email?: string;
    imageUrl?: string;
    subscription?: boolean;
    credits?: number;
};

export type UserDetailsContextType = {
    userDetails: UserDetails | null;
    setUserDetails: React.Dispatch<React.SetStateAction<UserDetails | null>>;
};

// Default value
export const UserDetailsContext = createContext<UserDetailsContextType | null>(
    null,
);
