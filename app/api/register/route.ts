import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const { name, email, password } = await req.json();

    const existing = await prisma.user.findUnique({ where: {email}});

    if (existing) {
        return NextResponse.json({ error: "User already exists "}, {status: 400});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: { name, email, password: hashedPassword},
    });

    return NextResponse.json({ user});
}