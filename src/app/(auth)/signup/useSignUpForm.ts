'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { message } from 'antd';
import { z } from 'zod';

import { BASE_URL } from '@/server/const';
import type { User } from '@/lib/types';

// Extend schema to include email
const signupSchema = z.object({
  name: z.string().min(3, 'Full name is required'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignUpValues = Omit<User, 'userId'>;

export default function useSignUpForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (values: SignUpValues) => {
    const result = signupSchema.safeParse(values);

    if (!result.success) {
      result.error.errors.forEach((err) => {
        message.error(err.message);
      });
      return;
    }

    const { username, password, name, email } = result.data;
    setLoading(true);

    try {
      // Check for existing username or email
      const checkRes = await fetch(
        `${BASE_URL}/users?username=${username}&email=${encodeURIComponent(email)}`
      );
      const existingUsers: User[] = await checkRes.json();

      if (existingUsers.length > 0) {
        message.error('Username or email already exists');
        setLoading(false);
        return;
      }

      const newUser: User = {
        userId: crypto.randomUUID(),
        username,
        password,
        name,
        email,
      };

      const res = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!res.ok) throw new Error('Failed to register user');

      const createdUser: User = await res.json();
      // Store under currentUser for consistency
      localStorage.setItem('currentUser', JSON.stringify(createdUser));

      message.success('Registration successful!');
      router.push('/accounts');
    } catch (error) {
      console.error(error);
      message.error('Something went wrong during signup');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleSignup,
  };
}
