import { db } from "@vercel/postgres";
import NextAuth, { AuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
  callbacks: {
    session({ session, user }) {
      return session;
    },
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const client = await db.connect();

        const { username, password } = credentials;
        console.log("here");

        const DbUser = await client.query("SELECT * FROM users WHERE email = $1 AND password = $2", [
          username,
          password,
        ]);

        const row = DbUser.rows[0] as User;
        console.log("row", row);

        if (row) {
          const user = { id: row.id, name: row.name, email: row.email };
          return user;
        } else {
          const newUser = await client.query(
            `INSERT INTO public.users(
              name, email, password, provider)
              VALUES ('name', $1, $2, 'credentials');`,
            [username, password]
          );

          const newRow = newUser.rows[0] as User;
          const user = { id: newRow.id, name: newRow.name, email: newRow.email };
          return user;
        }
      },
    }),
  ],
} as AuthOptions;
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
