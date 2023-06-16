import { db } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

async function createPet(formData: FormData) {
  "use server";
  const client = await db.connect();

  const name = formData.get("name")?.toString();
  const owner = formData.get("owner")?.toString();
  await client.sql`INSERT INTO Pets (Name, Owner) VALUES (${name}, ${owner});`;
  revalidatePath("/pets");
}

const AddPet = () => {
  return (
    <form action={createPet} className="flex flex-col gap-2 w-fit">
      <label htmlFor="name">Name</label>
      <input type="text" name="name" className="text-black" />
      <label htmlFor="owner">Owner</label>
      <input type="text" name="owner" className="text-black" />
      <button type="submit">Add Pet</button>
    </form>
  );
};

export default AddPet;
