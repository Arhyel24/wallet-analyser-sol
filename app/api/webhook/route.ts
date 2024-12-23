import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const request = await req.json();
  console.log(request);

  return NextResponse.json("", { status: 200 });
}

