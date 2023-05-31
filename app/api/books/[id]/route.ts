import { NextRequest, NextResponse } from "next/server";
import postgres, { pascal } from "postgres";

interface page{
    params:{id:number}
}

export async function GET(request: NextRequest,{params}:page) {

  const conn = postgres({
    ssl: require,
  });
const query=`SELECT * FROM "books" where id=${params.id}`
  const result = await conn.unsafe(query);

  return  NextResponse.json(result[0])
}