import {auth} from "auth";

export default async function ServerPage() {

    const session = await auth()

    if (!session || !session.user) {
        return (
            <div>
                <h3 className='text-2xl text-red-500'>You need to sign in first</h3>
            </div>
        )
    }

    return <>
        <h1>This is server page and must be protected</h1>
    </>
}