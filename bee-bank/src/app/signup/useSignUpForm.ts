'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { message } from 'antd';
import { z } from 'zod';
import { User } from '@/lib/types';
import { BASE_URL } from '@/server/const'; 

const signupSchema = z.object({
  name: z.string().min(3, 'Full name is required'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
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

    const { username, password, name } = result.data;
    setLoading(true);

    try {
      const checkRes = await fetch(`${BASE_URL}/users?username=${username}`);
      const existingUsers: User[] = await checkRes.json();

      if (existingUsers.length > 0) {
        message.error('Username already exists');
        setLoading(false);
        return;
      }

      const newUser: SignUpValues = {
        username,
        password,
        name,
      };

      const res = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!res.ok) throw new Error('Failed to register user');

      const createdUser = await res.json();
      localStorage.setItem('user', JSON.stringify(createdUser));

      message.success('Registration successful!');
      router.push('/dashboard');
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
