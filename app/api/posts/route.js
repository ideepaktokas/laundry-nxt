import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, res) {
  try {
    const records = await prisma.post.findMany();
    return NextResponse.json(records, { status: 200 });
  } catch (error) {
    return NextResponse.status(500).json({ message: error.message });
  }
}

// -- POST Query
export async function POST(req, res) {
  try {
    let { title, content, published, authorId } = await req.json();
    authorId = parseInt(authorId);
    published = parseInt(published) == 1;
    // Validation
    if (!title || !authorId) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check user existence
    const existuser = await prisma.post.findFirst({ where: { title } });
    if (existuser) {
      return NextResponse.json(
        { error: "Post already exists" },
        { status: 409 }
      );
    }

    const formData = { title, content, published, authorId };

    // Record create
    const record = await prisma.post.create({ data: formData });
    console.log(record);

    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
