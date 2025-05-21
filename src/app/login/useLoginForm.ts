'use client';
import { useRouter } from 'next/navigation';
import { message } from 'antd';
import { z } from 'zod';
import { useState } from 'react';

import { BASE_URL } from '@/server/const';

const loginSchema = z.object({
  username: z.string().min(3, 'Username is required'),
  password: z.string().min(5, 'Password is required'),
});

export default function useLoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (values: { username: string; password: string }) => {
    setError(null);

    const result = loginSchema.safeParse(values);
    if (!result.success) {
      result.error.errors.forEach((err) => message.error(err.message));
      return;
    }

    const { username, password } = result.data;
    setLoading(true);

    try {
      // Query users with matching credentials
      const res = await fetch(
        `${BASE_URL}/users?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
      );

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const users = await res.json();
      if (users.length === 0) {
        setError('Invalid credentials');
        message.error('Invalid username or password');
        return;
      }

      const user = users[0];
      console.log(user, "user")
      localStorage.setItem('currentUser', JSON.stringify(user));
      //message.success('Login successful!');
      console.log("success")
      router.push('/');
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
      message.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error };
}
