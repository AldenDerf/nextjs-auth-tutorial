"use client";

import { useState } from 'react';

export default function RegisterPage() {
    const [form, setForm] = useState({ name: "", email: "", password: ""});

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(form),
        });
        
        alert("Registered successfully!");
    }

    return (
        <div className='max-w-sm mx-auto mt-20'>
            <h2 className='text-2xl font-bold mb-4'>Register</h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                <input placeholder='Name' onChange={e => setForm({ ...form, name: e.target.value })} />
                <input placeholder='Email' onChange={ e => setForm({ ...form, email: e.target.value})} />
                <input type='password' placeholder='Password' onChange={e =>  setForm({...form, password: e.target.value})} />
                <button className='bg-blue-500 text-white py-2'>Register</button>
            </form>
        </div>
    )

}