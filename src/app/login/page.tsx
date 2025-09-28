'use client';

import { login } from "@/auth/form-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";

export default function Login() {
    const [state, action, pending] = useActionState(login, undefined);
    return (
        <>
            <div className="h-screen flex items-center justify-center">
                <Card className="w-full max-w-lg">
                    <CardHeader>
                        <CardTitle>Login To Your Account</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form action={action}>
                            <div>
                                <div className="flex justify-center text-red-500 mb-2">
                                    { state?.message }
                                </div>
                                <div>
                                    <Label className="ml-1.5 mb-2">Email</Label>
                                    <Input type="text" name="email" placeholder="user@org.com" />
                                    { state?.errors?.email && (<p className="ml-1.5 text-red-500">{ state.errors.email }</p>) }
                                </div>

                                <div className="mt-5">
                                    <Label className="ml-1.5 mb-2">Password</Label>
                                    <Input type="password" name="password" placeholder="********" />
                                    { state?.errors?.password && (<p className="ml-1.5 text-red-500">{ state.errors.password }</p>) }
                                </div>

                                <Button type="submit" className="mt-5">{ pending ? 'Submitting...' : 'Submit' }</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}