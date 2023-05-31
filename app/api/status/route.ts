import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";



export async function GET(request: NextRequest) {


    return NextResponse.json({
      status: "OK"
    })
}