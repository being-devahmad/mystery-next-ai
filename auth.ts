// import NextAuth from "next-auth"
//
// export const {handlers, signIn, signOut, auth} = NextAuth({
//     providers: [Google],
// })


import NextAuth, {NextAuthConfig} from "next-auth"
import Google from "@auth/core/providers/google";

const config = {
    providers: [Google],
} satisfies  NextAuthConfig

export const {handlers, signIn, auth, signOut} = NextAuth(config)