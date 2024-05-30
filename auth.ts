// import NextAuth from "next-auth"
//
// export const {handlers, signIn, signOut, auth} = NextAuth({
//     providers: [Google],
// })


import NextAuth, {NextAuthConfig} from "next-auth"
import Google from "@auth/core/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";


const credentialsConfig = CredentialsProvider({
    id: "credentials",
    name: "Credentials",
    credentials: {
        email: {
            label: "Email",
            type: "text"
        },
        password: {
            label: "Password",
            type: 'password'
        }
    },
    async authorize(credentials: any): Promise<any> {
        await dbConnect()
        try {
            const user = await UserModel.findOne({
                $or: [
                    {email: credentials.identifier.email},
                    {username: credentials.identifier.username},
                ]
            })

            if (!user) {
                throw new Error('No user found')
            }

            if (!user.isVerified) {
                throw new Error('Please verify your account first')
            }

            const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

            if (isPasswordCorrect) {
                return user
            } else {
                throw new Error('Incorrect password')

            }

            // if (credentials.email === 'someone@example.com' && credentials.password === '123') {
            //     return {
            //         name: "Ahmad",
            //     }
            // } else return null
        } catch (err: any) {
            throw new Error(err)
        }
    }
})

const config = {
    providers: [Google, credentialsConfig],
    callbacks: {
        async jwt({token, user}) {

            if (user) {
                token._id = user._id?.toString();
                token.isVerified = user.isVerified;
                token.isAcceptingMessages = user.isAcceptingMessages;
                token.username = user.username
            }
            return token
        },
        async session({session, user, token}) {

            if (token) {
                session.user._id = token._id?.toString();
                session.user.isVerified = token.isVerified;
                session.user.isAcceptingMessages = token.isAcceptingMessages;
                session.user.username = token.username
            }

            return session
        },

        // route protection
        // authorized({request, auth}) {
        //     const {pathname} = request.nextUrl
        //     if (pathname === '/middlewareProtectedPage') return !!auth
        //     return true
        // }
    },
    pages: {
        signIn: '/sign-in',
    },
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET

} satisfies  NextAuthConfig

export const {handlers, signIn, auth, signOut} = NextAuth(config)