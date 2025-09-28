'use client';
import { useUser } from "./UserContext"

export default function Dashboard() {
    const user = useUser();

    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <div>
                    <h1>Dashboard page</h1>
                </div>
                <div>
                    <h1>{ user?.firstName }</h1>
                    <h1>{ user?.lastName }</h1>
                </div>
            </div>
        </>
    )
}