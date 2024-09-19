import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function GET(req, res) {
  try {
    const records = await prisma.user.findMany();
    return NextResponse.json(records, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// -- POST Query
export async function POST(req, res) {
  try {
    const { name, email, password } = await req.json();
    // Validation
    if (!name || !email) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check user existence
    const existRecord = await prisma.user.findUnique({ where: { email } });
    if (existRecord) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // Password Hashing
    // const hashedPassword = await bcrypt.hash(password, 10);

    const formData = { name, email, password };

    // Record create
    const record = await prisma.user.create({ data: formData });

    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
