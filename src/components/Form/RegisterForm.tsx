'use client';

import React from "react";
import {UserCredentials} from "@/types/auth";
import {fetchRegisterUser} from "@/services/authServices";

interface ComparePassword {
    password: string;
    confirmPassword: string;
}

type ErrorsMessages = 'Passwords not matches' | 'Invalid Email'

interface Errors {
    errors: ErrorsMessages[];
}

export default function LoginForm() {
    const [userCredentialsData, setUserCredentialsData] = React.useState<UserCredentials>({
        email: "",
        password: "",
    });

    const [comparePassword, setComparePassword] = React.useState<ComparePassword>({
        password: "",
        confirmPassword: ""
    });

    const [passwordsIsEqual, setPasswordsIsEqual] = React.useState<boolean>(false);

    const [err, setErr] = React.useState<Errors>({
        errors: []
    });

    React.useEffect(() => {
        setErr((prev) => {
            const newErrors = [...prev.errors];

            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userCredentialsData.email)) {
                const index = newErrors.indexOf('Invalid Email');
                if (index !== -1) newErrors.splice(index, 1);
            } else {
                if (!newErrors.includes('Invalid Email')) {
                    newErrors.push('Invalid Email');
                }
            }

            if (
                comparePassword.password === comparePassword.confirmPassword &&
                comparePassword.password.length >= 6
            ) {
                const index = newErrors.indexOf('Passwords not matches');
                if (index !== -1) newErrors.splice(index, 1);
            } else {
                if (!newErrors.includes('Passwords not matches')) {
                    newErrors.push('Passwords not matches');
                }
            }

            return { ...prev, errors: newErrors };
        });
    }, [comparePassword, userCredentialsData]);

    React.useEffect(() => {
        if (userCredentialsData.email && comparePassword.password.length >= 6 && comparePassword.confirmPassword.length >= 6 && comparePassword.password === comparePassword.confirmPassword) {
            setPasswordsIsEqual(true);
        } else {
            setPasswordsIsEqual(false);
        }
    }, [comparePassword, userCredentialsData])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(userCredentialsData) // Não está enviando o password
        const response = await fetchRegisterUser(userCredentialsData)
        console.log(response)
    }

    function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;
        setUserCredentialsData((prev) => ({
            ...prev,
            email: value,
        }))
    }

    function handleChangePasswords(e: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setComparePassword((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor={'email'}>Email:</label>
            <input onChange={handleChangeEmail} id={'email'} name={'email'} type={'email'}
                   value={userCredentialsData.email}/>

            <label htmlFor={'password'}>Password:</label>
            <input onChange={handleChangePasswords} id={'password'} name={'password'} type={'password'}
                   value={comparePassword.password}/>

            <label htmlFor={'confirm-password'}>Confirm your password:</label>
            <input onChange={handleChangePasswords} id={'confirm-password'} name={'confirmPassword'} type={'password'}
                   value={comparePassword.confirmPassword}/>
            {err.errors && err.errors.map((err, index) => <p key={index}>{err}</p>)}


            {passwordsIsEqual ? <button disabled={false} type={'submit'}>Submit</button> :
                <button disabled={true} type={'submit'}>Submit</button>}
        </form>
    );
}