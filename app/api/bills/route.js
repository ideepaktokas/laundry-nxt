import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, res) {
  try {
    const records = await prisma.bills.findMany();
    return NextResponse.json(records, { status: 200 });
  } catch (error) {
    return NextResponse.status(500).json({ message: error.message });
  }
}

// -- POST Query
export async function POST(req, res) {
  try {
    let {
      track_code,
      bill_status,
      total_article,
      total_amount,
      delivery_date,
      receive_date,
      authorId,
    } = await req.json();

    // Prefill request with default value if missing
    authorId = parseInt(authorId);
    track_code = track_code ?? Math.floor(1000 + Math.random() * 9000);
    bill_status = bill_status ?? "pending";
    total_article = parseInt(total_article) ?? 1;
    total_amount = parseInt(total_amount) ?? 0;
    receive_date = receive_date
      ? new Date(Date.parse(receive_date))
      : new Date();
    let today = new Date();
    delivery_date = delivery_date
      ? new Date(Date.parse(delivery_date))
      : new Date(today.setDate(today.getDate() + 4));

    // Validation
    if (!total_article || !authorId) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check user existence
    const existuser = false; //await prisma.post.findFirst({ where: { title } });
    if (existuser) {
      return NextResponse.json(
        { error: "Post already exists" },
        { status: 409 }
      );
    }

    const formData = {
      track_code,
      bill_status,
      total_article,
      total_amount,
      delivery_date,
      receive_date,
      authorId,
    };

    // Record create
    const record = await prisma.bills.create({ data: formData });
    console.log(record);

    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
