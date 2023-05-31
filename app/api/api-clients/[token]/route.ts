import { verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

interface params{
    params:{token:string}
}

export async function POST(_: NextRequest,{params}:params) {
   const userinfo=verify(params.token,process.env.Secret_Key!)


   
    return NextResponse.json({
        userinfo
    })
}