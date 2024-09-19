import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function DELETE(req, res) {
  try {
    const id = parseInt(res.params.id);
    if (!id) {
      return NextResponse.json({ error: "ID is requred" }, { status: 400 });
    }

    // Check record existence
    const record = await prisma.bills.findUnique({ where: { id } });

    if (!record) {
      return NextResponse.json({ error: "Bill not found" }, { status: 404 });
    }

    // Deletion
    await prisma.bills.delete({ where: { id } });

    return NextResponse.json(
      { message: "Bill deleted successfully" },
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
    const existRecord = await prisma.bills.findFirst({
      where: { track_code },
    });
    if (false && existRecord && existRecord.id != id) {
      return NextResponse.json(
        { error: "Bill already registered" },
        { status: 409 }
      );
    }

    const formData = {
      bill_status,
      total_article,
      total_amount,
      delivery_date,
      receive_date,
      authorId,
    };

    // Record create
    const record = await prisma.bills.update({ where: { id }, data: formData });

    return NextResponse.json(record, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
