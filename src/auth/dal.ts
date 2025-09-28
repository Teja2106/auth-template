import { cache } from "react";
import { verifySession } from "./session";
import { User } from "./user";

export const getUser = cache(async () => {
    const session = await verifySession();

    if (!session) return null;

    try {
        if (session.userId === User[0].id) {
            const user = User[0];

            return user;
        }
    } catch {
        console.log('Failed to fetch user.');
        return null;
    }
})