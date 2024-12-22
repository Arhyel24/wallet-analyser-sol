import { NextRequest, NextResponse } from "next/server";

export default async function GET(req: NextRequest, res: NextResponse) {
    const request = await req.json();
    console.log(request);

    return NextResponse.json("", {status: 200});
}