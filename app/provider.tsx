"use client";

import { checkAndCreateUser } from "@/app/actions/user";
import { useUser } from "@clerk/nextjs";
import { ReactNode, useEffect } from "react";

const Provider = ({ children }: { children: ReactNode }) => {
    const { user } = useUser();

    useEffect(() => {
        if (user?.primaryEmailAddress?.emailAddress) {
            checkAndCreateUser({
                name: user.fullName || "Username",
                email: user.primaryEmailAddress.emailAddress,
                imageUrl: user.imageUrl || "Not Found",
            });
        }
    }, [user]);

    return <>{children}</>;
};

export default Provider;
