import { cache } from "react";
import { verifySession } from "./session";
import { User, UserType } from "./user";

export const getUser = cache(async () => {
    const session = await verifySession();

    if (!session) return null;

    try {
        if (session.userId === User[0].id) {
            const user = User[0];

            const filteredUser = userDTO(user);

            return filteredUser;
        }
    } catch {
        console.log('Failed to fetch user.');
        return null;
    }
});

function userDTO(user: UserType) {
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    }
}