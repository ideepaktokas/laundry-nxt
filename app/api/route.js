import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    return NextResponse.json({ name: "Twork" }, { status: 200 });
  } catch (error) {
    NextResponse.status(500).json({ message: error.message });
  }
}
