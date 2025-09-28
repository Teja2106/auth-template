'use client';

import { logout } from "@/auth/form-actions";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
    return (
        <Button onClick={async () => await logout()}>Logout</Button>
    )
}