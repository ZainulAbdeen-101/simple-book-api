import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";
import {JWTtoken} from '../api-clients/helper'

interface Body{
    clientName:string;
    clientEmail:string;
}

export async function POST(request: NextRequest) {
    const conn = postgres({
      ssl: 'require',
    });
    
    const {clientName,clientEmail}= await request.json() as Body
  
  const query=`INSERT INTO "apiclients" (client_name,client_email) VALUES ('${clientName}',
  '${clientEmail}') returning *`
   const [{client_name,client_email}]= await conn.unsafe(query);
 
    const token=await  JWTtoken({ client_email,client_name,})
  console.log(token)
return NextResponse.json({
token
});
    
  }