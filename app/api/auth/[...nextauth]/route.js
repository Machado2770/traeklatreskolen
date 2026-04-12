import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Admin login",
      credentials: {
        username: { label: "Email eller brugernavn", type: "text" },
        password: { label: "Adgangskode",            type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

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
            if (ok) return { id: data.id, name: data.name, email: data.email, role: data.role };
          }
        } catch { /* Supabase ikke tilgængelig — falder igennem */ }

        // 2. Fallback til .env-variabler (bagud-kompatibelt)
        if (
          credentials.username === process.env.ADMIN_USERNAME &&
          credentials.password === process.env.ADMIN_PASSWORD
        ) {
          return { id: "env-admin", name: "Admin", email: "" };
        }

        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages:   { signIn: "/login" },
  secret:  process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
