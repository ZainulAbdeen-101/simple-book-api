import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

interface page {
  params: { id: number };
}
interface Body {
  customerName: string
}

export async function GET(request: NextRequest, { params }: page) {
  const conn = postgres({
    ssl: 'require',
  });
  const Auth = request.headers.get("Authorization")!;
  if (!Auth) {
    return NextResponse.json(
      { error: "required fields missing." },
      {
        status: 403,
      }
    );
  } else {
    const query = `SELECT * FROM "orders" where orderId=${params.id}`;
    const result = await conn.unsafe(query);

    return NextResponse.json(result);
  }
}

export async function DELETE(request: NextRequest, { params }: page) {
  const conn = postgres({
    ssl: 'require',
  });
  const Auth = request.headers.get("Authorization")!;

  if (!Auth) {
    return NextResponse.json(
      { error: "required fields missing." },
      {
        status: 403,
      }
    );
  } else {
    const query = `DELETE FROM "orders" 
   where orderId=${params.id} 
    `;

    const response = await conn.unsafe(query);

    return NextResponse.json(response);
  }
}

export async function PATCH(request: NextRequest, { params }: page) {
  const conn = postgres({
    ssl: 'require',
  });
  const { customerName } = await request.json() as Body



  const Auth = request.headers.get("Authorization")!;
  if (!Auth) {
    return NextResponse.json(
      { error: "Authorization Failed" },
      {
        status: 403,
      }
    );
  } else {
    const query = `UPDATE "orders" SET customer_name='${customerName}' where orderId=${params.id}`
    const result = await conn.unsafe(query);

    return NextResponse.json({
      updated: true,
      orderId: params.id
    });
  }
}