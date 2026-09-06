import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { rateLimit, clientIp } from "@/lib/rateLimit";

const REMEMBER_MAX_AGE = 30 * 24 * 60 * 60;
const SESSION_MAX_AGE  =      24 * 60 * 60;

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin login",
      credentials: {
        username: { label: "Email eller brugernavn", type: "text" },
        password: { label: "Adgangskode",            type: "password" },
        remember: { label: "Husk mig",               type: "text" },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) return null;

        // ── Brute-force-beskyttelse: begræns loginforsøg pr. IP ─
        // Fejler åbent hvis IP ikke kan udledes, så en manglende header
        // aldrig kan låse alle brugere ude på én delt "unknown"-nøgle.
        const ip = clientIp(req);
        if (ip && ip !== "unknown") {
          const rl = rateLimit(`login:${ip}`, { limit: 8, windowMs: 5 * 60_000 });
          if (!rl.ok) return null;
        }

        const remember = credentials.remember === "true";

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
        } catch { /* Supabase ikke tilgængelig */ }

        // Der er med vilje ingen reserveadgang via miljøvariabler. Tidligere
        // gav ADMIN_USERNAME/ADMIN_PASSWORD rollen "super" på et rent
        // tekstsammenlign uden om admins-tabellen — en statisk adgangskode
        // der aldrig udløb og ikke var hashet. Alle admins ligger nu i
        // admins-tabellen med bcrypt. Skal en konto oprettes eller nulstilles,
        // gøres det i /admin/brugere eller direkte i tabellen.
        return null;
      },
    }),
  ],

  session: { strategy: "jwt", maxAge: REMEMBER_MAX_AGE },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role     = user.role;
        token.remember = user.remember;
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
};
