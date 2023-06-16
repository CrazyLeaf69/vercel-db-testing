import { db } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const client = await db.connect();

  const pets = await client.sql`SELECT * FROM Pets;`;
  return response.status(200).json({ pets });
  // return response.status(200).json(pets.rows);
}
