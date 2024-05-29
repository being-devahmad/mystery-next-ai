// import NextAuth from "next-auth"
//
// export const {handlers, signIn, signOut, auth} = NextAuth({
//     providers: [Google],
// })


import NextAuth, {NextAuthConfig} from "next-auth"
import Google from "@auth/core/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const credentialsConfig = CredentialsProvider({
    name: "Credentials",
    credentials: {
        username: {
            label: "User Name",
        },
        password: {
            label: "Password",
            type: 'password'
        }
    },
    async authorize(credentials) {
        if (credentials.username === 'sk' && credentials.password === '123') {
            return {
                name: "Ahmad",
            }
        } else return null
    }
})

const config = {
    providers: [Google, credentialsConfig],
    callbacks: {
        authorized({request, auth}) {
            const {pathname} = request.nextUrl
            if (pathname === '/middlewareProtectedPage') return !!auth
            return true
        }
    }
} satisfies  NextAuthConfig

export const {handlers, signIn, auth, signOut} = NextAuth(config)