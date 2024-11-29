import {UserCredentials} from "@/types/auth";

export const fetchRegisterUser = async (userCredentials: UserCredentials) =>{
    const response:unknown = await fetch('/api/userRegister', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCredentials)
    })
    return response;
}