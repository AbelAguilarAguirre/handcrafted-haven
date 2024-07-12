import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM "user" WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(8) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;
            const user = await getUser(email);
            if (!user) return null;
            const passwordsMatch = await compare(password, user.password);

            if (passwordsMatch) {
              return {
                name: user.name,
                email: user.email,
                id: user.user_id
              };
            }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
        if (user) {
          token.sub = user.id;
        }

        return token;
    },
    session({ session, token }) {
        if (session) {
          session.user.id = token.sub;
        }

        return session;
    }
  }
});

export { handler as GET, handler as POST };