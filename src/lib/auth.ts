import { SignJWT, jwtVerify } from "jose";
import { NextResponse } from "next/server";

export const SESSION_COOKIE = "spardha_session";
const SESSION_MAX_AGE = 60 * 60 * 12;

function secretKey() {
  const value = process.env.JWT_SECRET;
  if (!value) {
    throw new Error("JWT_SECRET is not set");
  }
  return new TextEncoder().encode(value);
}

export async function signSession(student: {
  id: string;
  email: string;
  name: string;
}) {
  return new SignJWT({ email: student.email, name: student.name })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(student.id)
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(secretKey());
}

export async function readSession(token: string) {
  const { payload } = await jwtVerify(token, secretKey());
  if (!payload.sub) return null;
  return { id: payload.sub };
}

function cookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

export function applySessionCookie(response: NextResponse, token: string) {
  response.cookies.set(SESSION_COOKIE, token, cookieOptions(SESSION_MAX_AGE));
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set(SESSION_COOKIE, "", cookieOptions(0));
}
