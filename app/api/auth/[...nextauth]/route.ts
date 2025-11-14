import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const handler = NextAuth({
  session: {
    strategy: "database",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) return null;

        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async session({session, token, user}) {
        // attach role to session
        if (user) session.user = {...session.user, role: user.role};
        return session;
    },
  },

  adapter: {
    // simple database session adapter
    async getSessionAndUser(sessionToken) {
        const session = await prisma.session.findUnique({
            where: { sessionToken},
            include: { user: true},
        });

        if (!session) return null;
        const {user, ...sessionData } = session;
        return { session: sessionData, user};
    }
  }
});

export { handler as GET, handler as POST};
