import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId:
        "799868935423-btcgf7rku071d10q3p3u7qv1so28sn35.apps.googleusercontent.com",
      clientSecret: "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",
      authorization: { params: { scope: "profile email" } },
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.user = { ...account, ...user };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
};
export default NextAuth(authOptions);
