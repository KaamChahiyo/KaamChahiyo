import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../lib/prismadb";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  debug: true,

  pages: {
    signIn: "/signin",
    signOut: "/signout",
    error: "/error", // Error code passed in query string as ?error=
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user["userId"] = token.sub;
      }
      const updatedUser = await prisma.user.findFirst({
        where: {
          id: token.sub,
        },
        select: {
          email: true,
        },
      });
      session.user["email"] = updatedUser.email;
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
