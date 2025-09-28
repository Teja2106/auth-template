'use server';

import { redirect } from "next/navigation";
import { FormState, LoginSchema } from "./FormSchema";
import { createSession, deleteSession } from "./session";
import { User } from "./user";

export async function login(state: FormState, formData: FormData) {

    const validateFields = LoginSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
    });

    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors
        }
    }

    const { email, password } = validateFields.data;

    if (email !== User[0].email || password !== User[0].password) {
        return {
            message: 'Invalid Credentials.'
        }
    }

    const UserId = User[0].id;
    await createSession(UserId);
    redirect('/dashboard');
}

export async function logout() {
    await deleteSession();
}