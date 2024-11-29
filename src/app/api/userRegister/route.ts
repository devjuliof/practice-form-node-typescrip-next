interface userRegisterData {
    email: string;
    password: string;
}

export async function POST(req: Request) {
    const {email, password}: userRegisterData = await req.json()
    console.log(email)
    console.log(password)
    return new Response(JSON.stringify({ message: 'Not implemented!' }), { status: 500 });
}