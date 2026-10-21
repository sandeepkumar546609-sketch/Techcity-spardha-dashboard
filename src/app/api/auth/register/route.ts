import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { applySessionCookie, signSession } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import { Student, toPublicStudent } from "@/lib/student";
import { validateRegister, type RegisterInput } from "@/lib/student-fields";

export async function POST(request: Request) {
  let body: Partial<RegisterInput>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "The account details could not be read. Try again." },
      { status: 400 },
    );
  }

  const input: RegisterInput = {
    name: String(body.name ?? ""),
    email: String(body.email ?? ""),
    password: String(body.password ?? ""),
    collegeName: String(body.collegeName ?? ""),
    batch: String(body.batch ?? ""),
  };

  const error = validateRegister(input);
  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  const email = input.email.trim().toLowerCase();

  try {
    await connectDb();
    const existing = await Student.findOne({ email }).select("_id");
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists. Log in instead." },
        { status: 409 },
      );
    }

    const passwordHash = await hash(input.password, 12);
    const student = await Student.create({
      name: input.name.trim(),
      email,
      passwordHash,
      collegeName: input.collegeName.trim(),
      batch: input.batch.trim(),
    });

    const publicStudent = toPublicStudent(student);
    const token = await signSession(publicStudent);
    const response = NextResponse.json({ student: publicStudent });
    applySessionCookie(response, token);
    return response;
  } catch (caught) {
    if (
      typeof caught === "object" &&
      caught !== null &&
      "code" in caught &&
      caught.code === 11000
    ) {
      return NextResponse.json(
        { error: "An account with this email already exists. Log in instead." },
        { status: 409 },
      );
    }

    console.error("Register failed", caught);
    return NextResponse.json(
      { error: "The account could not be saved. Try again in a moment." },
      { status: 500 },
    );
  }
}
