'use client'

import {useSession} from "next-auth/react";

export default function ClientPage() {

    const {data: session} = useSession()
    if (!session || !session.user) {
        return (
            <div>
                <h3 className='text-2xl'>You need to sign in first</h3>
            </div>
        )
    }

    return <>
        <div>
            <h1 className='text-4xl'>This is client page and must be protected</h1>
        </div>
    </>
}