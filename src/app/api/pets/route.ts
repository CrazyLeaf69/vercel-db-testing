import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await db.connect();

  const pets = await client.sql`SELECT * FROM Pets;`;
  //   return NextResponse.json({ pets });
  return NextResponse.json(pets.rows);
}

export async function POST(request: Request) {
  console.log("here");
  return NextResponse.json({ test: "hello" });

  // const client = await db.connect();
  // const body = request.body as { name: string; owner: string } | null;
  // console.log("body", body);
  // if (!body) {
  //   return NextResponse.json({ error: "No body" });
  // }
  // const res = await client.sql`INSERT INTO Pets (Name, Owner) VALUES (${body.name}, ${body.owner});`.catch((error) => {
  //   console.log("error", error);
  //   throw error;
  // });

  // return NextResponse.json(res.rows);
}
