import { getUser } from "@/auth/dal";
import LogoutButton from "@/components/custom/Logout-button";
import { UserProvider } from "./UserContext";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const user = await getUser();

    return (
        <>
            <UserProvider value={user}>
                <nav className="mt-3 mr-3 flex justify-end">
                    <LogoutButton />
                </nav>
                <div>
                    { children }
                </div>
            </UserProvider>
        </>
    )
}