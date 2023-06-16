import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen flex-col p-5 items-end">
      <Link href={"/api/auth/signin"}>Sign in</Link>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </main>
  );
}

// export default async function Page() {
//   const session = await getServerSession(authOptions)
//   return <pre>{JSON.stringify(session, null, 2)}</pre>
// }
