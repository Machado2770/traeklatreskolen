import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

const REMEMBER_MAX_AGE = 30 * 24 * 60 * 60; // 30 dage
const SESSION_MAX_AGE  =      24 * 60 * 60; // 24 timer (uden husk mig)

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Admin login",
      credentials: {
        username: { label: "Email eller brugernavn", type: "text" },
        password: { label: "Adgangskode",            type: "password" },
        remember: { label: "Husk mig",               type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        const remember = credentials.remember === "true";

        // 1. Prøv Supabase admins-tabel (email-login)
        try {
          const supabase = getSupabaseAdmin();
          const { data, error } = await supabase
            .from("admins")
            .select("id, name, email, password_hash, role")
            .eq("email", credentials.username)
            .single();

          if (!error && data) {
            const ok = await bcrypt.compare(credentials.password, data.password_hash);
            if (ok) return { id: data.id, name: data.name, email: data.email, role: data.role, remember };
          }
        } catch { /* Supabase ikke tilgængelig — falder igennem */ }

        // 2. Fallback til .env-variabler (bagud-kompatibelt)
        if (
          credentials.username === process.env.ADMIN_USERNAME &&
          credentials.password === process.env.ADMIN_PASSWORD
        ) {
          return { id: "env-admin", name: "Admin", email: "", remember };
        }

        return null;
      },
    }),
  ],

  session: { strategy: "jwt", maxAge: REMEMBER_MAX_AGE },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Første login — gem rolle og remember-flag
        token.role     = user.role;
        token.remember = user.remember;
        // Sæt udløb dynamisk
        token.exp = Math.floor(Date.now() / 1000) +
          (user.remember ? REMEMBER_MAX_AGE : SESSION_MAX_AGE);
      }
      return token;
    },
    async session({ session, token }) {
      if (token.role) session.user.role = token.role;
      return session;
    },
  },

  pages:  { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
