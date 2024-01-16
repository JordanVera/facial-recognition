// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default NextAuth({
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // You can perform additional actions here upon sign in
      console.log('USSER');
      console.log(user);
      return true;
    },
    async session({ session, user, token }) {
      // You can add more user data to the session here
      session.user = user;
      return session;
    },
    // ...other callbacks
  },

  // Additional NextAuth configuration...
});
