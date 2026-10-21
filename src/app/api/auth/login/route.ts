import { compare } from "bcryptjs";
import { NextResponse } from "next/server";
import { applySessionCookie, signSession } from "@/lib/auth";
import { connectDb, describeAuthError } from "@/lib/db";
import { Student, toPublicStudent } from "@/lib/student";
import { validateLogin, type LoginInput } from "@/lib/student-fields";

export async function POST(request: Request) {
  let body: Partial<LoginInput>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "The login details could not be read. Try again." },
      { status: 400 },
    );
  }

  const input: LoginInput = {
    email: String(body.email ?? ""),
    password: String(body.password ?? ""),
  };

  const error = validateLogin(input);
  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  try {
    await connectDb();
    const student = await Student.findOne({
      email: input.email.trim().toLowerCase(),
    });

    if (!student) {
      return NextResponse.json(
        { error: "No account found with this email." },
        { status: 401 },
      );
    }

    const matches = await compare(input.password, student.passwordHash);
    if (!matches) {
      return NextResponse.json(
        { error: "Incorrect password." },
        { status: 401 },
      );
    }

    const publicStudent = toPublicStudent(student);
    const token = await signSession(publicStudent);
    const response = NextResponse.json({ student: publicStudent });
    applySessionCookie(response, token);
    return response;
  } catch (caught) {
    console.error("Login failed", caught);
    return NextResponse.json(
      {
        error: describeAuthError(caught, "Login could not be completed."),
      },
      { status: 500 },
    );
  }
}
