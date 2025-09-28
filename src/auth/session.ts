import 'server-only';

import type { SessionPayload } from './FormSchema';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

const sessionSecretKey = 'encrypted_256_bit_secret';
const sessionKey = new TextEncoder().encode(sessionSecretKey);

const refreshSecretKey = 'encrypted_256_bit_secret';
const refreshKey = new TextEncoder().encode(refreshSecretKey);


export async function encryptSession(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('5m')
        .sign(sessionKey);
}

export async function encryptRefresh(userId: { userId: string | number }) {
    return new SignJWT(userId)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('10m')
        .sign(refreshKey);
}

export async function decryptSession(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, sessionKey, {
            algorithms: ['HS256']
        });

        return payload;
    } catch {
        return null;
    }
}

export async function decryptRefresh(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, refreshKey, {
            algorithms: ['HS256']
        });

        return payload;
    } catch {
        return null;
    }
}

export async function createSession(userId: string | number) {
    const sessionExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
    const refreshExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    const session = await encryptSession({ userId, expiresAt: sessionExpiresAt });
    const refresh = await encryptRefresh({userId});

    const cookieStore = await cookies();
    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: sessionExpiresAt,
        sameSite: 'lax',
        path: '/'
    });

    cookieStore.set('refresh', refresh, {
        httpOnly: true,
        secure: true,
        expires: refreshExpiresAt,
        sameSite: 'lax',
        path: '/'
    });
}

export async function verifySession() {
    const cookieStore = await cookies();
    const cookie = cookieStore.get('session')?.value;
    const session = await decryptSession(cookie);

    if (!session?.userId) {
        redirect('/login');
    }

    return { isAuth: true, userId: Number(session.userId) };
}

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get('session')?.value;
    const refresh = request.cookies.get('refresh')?.value;

    if (!refresh) return NextResponse.next();

    const sessionPayload = session ? await decryptSession(session) : null;
    const refreshPayload = await decryptRefresh(refresh);

    if (sessionPayload?.userId) {
        return NextResponse.next();
    }

    if (refreshPayload?.userId) {
        const newSessionExpires = new Date(Date.now() + 5 * 60 * 1000);
        const newSession = await encryptSession({
            userId: Number(refreshPayload.userId),
            expiresAt: newSessionExpires
        });

        const res = NextResponse.next();
        res.cookies.set('session', newSession, {
            httpOnly: true,
            secure: true,
            expires: newSessionExpires,
            sameSite: 'lax',
            path: '/'
        });

        return res;
    }

    const res = NextResponse.redirect(new URL('/login', request.url));
    res.cookies.delete('session');
    res.cookies.delete('refresh');
    
    return res;
}

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete('session');
    cookieStore.delete('refresh');
    redirect('/login');
}