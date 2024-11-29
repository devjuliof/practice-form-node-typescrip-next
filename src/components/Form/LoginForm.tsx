'use client';

import React from "react";

interface UserLoginData {
    email: string;
    password: string;
}

export default function LoginForm() {
    const [userLoginData, setUserLoginData] = React.useState<UserLoginData>({
        email: "",
        password: "",
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const response = await fetch('/api/userRegister', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userLoginData)
        })
        console.log(response)
    };

    function handleChangeFormInputs(e: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setUserLoginData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    return (
        <form onSubmit={handleSubmit}>
            <input onChange={handleChangeFormInputs} name={'email'} type={'email'} value={userLoginData.email}/>
            <input onChange={handleChangeFormInputs} name={'password'} type={'password'}
                   value={userLoginData.password}/>
            <button type={'submit'}>Submit</button>
        </form>
    );
}