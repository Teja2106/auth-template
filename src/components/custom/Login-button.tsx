import Link from "next/link";
import { Button } from "../ui/button";

export default function LoginButton() {
    return (
        <>
            <Link href={`/login`}>
                <Button type="button">Login</Button>
            </Link>
        </>
    )
}