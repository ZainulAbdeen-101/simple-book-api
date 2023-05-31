import { NextResponse, NextRequest } from "next/server";
import postgres from "postgres";

interface Body {
  bookId: number;
  customerName: string;
  quantity: number;
  orderId: number;
}

interface page {
  params: { id: number };
}
export async function POST(request: NextRequest) {
  const conn = postgres({
    ssl: 'require',
  });
  try {
    const { bookId, customerName, quantity, orderId } =
      (await request.json()) as Body;
    const Auth = request.headers.get("Authorization")!;
    

    if (!Auth) {
      return NextResponse.json(
        { error: "Authorization Failed" },
        {
          status: 403,
        }
      );
    }

    if (!bookId && !customerName && !orderId) {
      return NextResponse.json({
        error: "missing Required Fields",
      });
    }

    const query = `INSERT INTO "orders" (bookId, customer_name, quantity,orderId)
  VALUES (${bookId},'${customerName}',${quantity},${orderId}) returning *`;

    const response = await conn.unsafe(query);

    return NextResponse.json(response, {
      status: 201,
    });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      {
        status: 500,
      }
    );
  }
}

export async function GET(request: NextRequest) {
  const conn = postgres({
    ssl: 'require',
  });

  const Auth = request.headers.get("Authorization")!;
  if (!Auth) {
    return NextResponse.json(
      { error: "Authorization Failed" },
      {
        status: 403,
      }
    );
  } else {
    const result = await conn.unsafe("SELECT * FROM orders");

    return NextResponse.json(result);
  }
}


