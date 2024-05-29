import {auth, signIn, signOut} from "auth";
import Link from "next/link";

export default async function AppBar() {

    const session = await auth()


    return <>
        <div className='p-2 bg-gradient-to-b from-slate-800 to-slate-600 flex gap-2 text-white'>

            <div className='flex gap-4'>
                <Link href={'/'}>Home</Link>
                <Link href={'/clientPage'}>Client Page</Link>
                <Link href={'/serverPage'}>Server Page</Link>
                <Link href={'/middlewareProtectedPage'}>Middleware Protected Page</Link>
            </div>
            <div className='ml-auto'>
                {
                    session && session.user ? (
                        <div className='flex gap-3 '>
                            <p>{session.user.name}</p>
                            <form action={async () => {
                                'use server'
                                await signOut()
                            }}>
                                <button type='submit'>Sign Out</button>
                            </form>
                        </div>
                    ) : (
                        <form action={async () => {
                            'use server'
                            await signIn()
                        }}>
                            <button type='submit'>Sign In</button>
                        </form>
                    )
                }
            </div>
        </div>
    </>
}