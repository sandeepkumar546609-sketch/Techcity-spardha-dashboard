import { NextRequest, NextResponse } from "next/server";
import { readSession, SESSION_COOKIE } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import { Student, toPublicStudent } from "@/lib/student";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) {
    return NextResponse.json({ student: null });
  }

  try {
    const session = await readSession(token);
    if (!session) {
      return NextResponse.json({ student: null });
    }

    await connectDb();
    const student = await Student.findById(session.id).select(
      "name email collegeName batch",
    );
    if (!student) {
      return NextResponse.json({ student: null });
    }

    return NextResponse.json({ student: toPublicStudent(student) });
  } catch {
    return NextResponse.json({ student: null });
  }
}
