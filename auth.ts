import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
export const {
handlers,
auth,
signIn,
signOut,
} = NextAuth({
trustHost: true,
session: { strategy: "jwt" },
secret: process.env.AUTH_SECRET,
providers: [
Google({
clientId: process.env.AUTH_GOOGLE_ID ?? "",
clientSecret: process.env.AUTH_GOOGLE_SECRET ?? "",
}),
],
});
