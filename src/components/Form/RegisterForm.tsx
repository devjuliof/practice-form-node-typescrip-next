'use client';

import React from "react";
import {UserCredentials} from "@/types/auth";
import {fetchRegisterUser} from "@/services/authServices";

interface ComparePassword {
    password: string;
    confirmPassword: string;
}

interface Errors {
    emailInput: string[],
    passwordInput: string[],
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

    const [err, setErr] = React.useState<Errors>({
        emailInput: [],
        passwordInput: []
    });

    const [showError, setShowError] = React.useState<boolean>(false)

    React.useEffect(() => {
        setErr((prev) => {
            const newErrors: Errors = {...prev};

            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userCredentialsData.email)) {
                const index = newErrors.emailInput.indexOf('Invalid Email');
                if (index !== -1) newErrors.emailInput.splice(index, 1);
            } else {
                if (!newErrors.emailInput.includes('Invalid Email')) {
                    newErrors.emailInput.push('Invalid Email');
                }
            }

            if (
                comparePassword.password === comparePassword.confirmPassword
            ) {
                const index = newErrors.passwordInput.indexOf('Passwords not matches');
                if (index !== -1) newErrors.passwordInput.splice(index, 1);
            } else {
                if (!newErrors.passwordInput.includes('Passwords not matches')) {
                    newErrors.passwordInput.push('Passwords not matches');
                }
            }

            if (comparePassword.password.length < 6 || comparePassword.confirmPassword.length < 6) {
                if (!newErrors.passwordInput.includes('Password should be more than 6')) {
                    newErrors.passwordInput.push('Password should be more than 6');
                }
            } else {
                const index = newErrors.passwordInput.indexOf('Password should be more than 6');
                if (index !== -1) newErrors.passwordInput.splice(index, 1);
            }

            return { ...prev, errors: newErrors };
        });
    }, [comparePassword, userCredentialsData]);

    React.useEffect(() => {
        if (comparePassword.password.length >= 6 &&
            comparePassword.confirmPassword.length >= 6 &&
            comparePassword.password === comparePassword.confirmPassword)
        {
            setUserCredentialsData((prev) => ({
                ...prev,
                password: comparePassword.password
            }))
        } else {
            setUserCredentialsData((prev) => ({
                ...prev,
                password: ''
            }))
        }
    }, [comparePassword.confirmPassword, comparePassword.password])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (err.passwordInput || err.emailInput) {
            setShowError(true)
        }
        const errors: boolean = err.emailInput.length !== 0 || err.passwordInput.length !== 0;
        if (!errors) {
            console.log(userCredentialsData)
            const response = await fetchRegisterUser(userCredentialsData)
            console.log(response)
        }
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
            {showError && err.emailInput.map((err, index) => <p key={index}>{err}</p>)}

            <label htmlFor={'password'}>Password:</label>
            <input onChange={handleChangePasswords} id={'password'} name={'password'} type={'password'}
                   value={comparePassword.password}/>
            {showError && err.passwordInput.map((err, index) => <p key={index}>{err}</p>)}

            <label htmlFor={'confirm-password'}>Confirm your password:</label>
            <input onChange={handleChangePasswords} id={'confirm-password'} name={'confirmPassword'} type={'password'}
                   value={comparePassword.confirmPassword}/>


            <button  type={'submit'}>Submit</button>
        </form>
    );
}