import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Admin login",
      credentials: {
        username: { label: "Brugernavn", type: "text" },
        password: { label: "Kode", type: "password" },
      },
      async authorize(credentials) {
        const expectedUsername = process.env.ADMIN_USERNAME;
        const expectedPassword = process.env.ADMIN_PASSWORD;

        if (
          credentials?.username === expectedUsername &&
          credentials?.password === expectedPassword
        ) {
          return { id: "admin", name: "Admin" };
        }

        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
