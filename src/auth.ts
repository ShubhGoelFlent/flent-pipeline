import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const allowedDomain = (process.env.AUTH_ALLOWED_DOMAIN ?? "flent.in")
  .trim()
  .toLowerCase();

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID ?? "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async signIn({ user, profile }) {
      const email = String(
        user.email ?? (profile?.email as string | undefined) ?? "",
      )
        .trim()
        .toLowerCase();
      if (!email) return false;
      return email.endsWith(`@${allowedDomain}`);
    },
  },
};
