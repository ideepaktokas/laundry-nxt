import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function DELETE(req, res) {
  try {
    const id = parseInt(res.params.id);

    // Validation
    // if (!id || typeof id != "string") {
    if (!id) {
      return NextResponse.json(
        { error: "User ID is requred and should be a string" },
        { status: 400 }
      );
    }

    // Check user existence
    const record = await prisma.user.findUnique({ where: { id } });

    if (!record) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Deletion
    await prisma.user.delete({ where: { id } });

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// -- PUT Query
export async function PUT(req, { params }) {
  try {
    const id = parseInt(params.id);
    const { name, email, password } = await req.json();

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check user existence
    const existRecord = await prisma.user.findUnique({
      where: { email },
    });
    if (existRecord && existRecord.id != id) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    // Password Hashing
    // const hashedPassword = await bcrypt.hash(password, 10);

    const formData = { name, email, password };

    // Record create
    const record = await prisma.user.update({ where: { id }, data: formData });

    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
