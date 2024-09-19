import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function DELETE(req, res) {
  try {
    const id = parseInt(res.params.id);
    if (!id) {
      return NextResponse.json(
        { error: "User ID is requred and should be a string" },
        { status: 400 }
      );
    }

    // Check user existence
    const record = await prisma.post.findUnique({ where: { id } });

    if (!record) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Deletion
    await prisma.post.delete({ where: { id } });

    return NextResponse.json(
      { message: "Post deleted successfully" },
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
    const existuser = await prisma.post.findFirst({
      where: { title },
    });
    console.log(existuser);
    if (existuser && existuser.id != id) {
      return NextResponse.json(
        { error: "Post already registered" },
        { status: 409 }
      );
    }

    const formData = { title, content, published, authorId };

    // Record create
    const record = await prisma.post.update({ where: { id }, data: formData });

    return NextResponse.json(record, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
