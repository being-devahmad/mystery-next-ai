import "next-auth"
import {DefaultSession} from "next-auth";
import {decl} from "postcss";

declare module 'next-auth' {
    interface User {
        _id?: string,
        isVerified?: boolean,
        isAcceptingMessages?: boolean,
        username?: string
    }

    interface Session {
        user: {
            _id?: string,
            isVerified?: boolean,
            isAcceptingMessages?: boolean,
            username?: string
        } & DefaultSession ['user']
    }
}

// Alternative way
// declare module 'next-auth/jwt' {
//     interface JWT {
//         _id?: string,
//         isVerified?: boolean,
//         isAcceptingMessages?: boolean,
//         username?: string
//     }
// }