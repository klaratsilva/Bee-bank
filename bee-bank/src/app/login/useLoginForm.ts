'use client';
import { useRouter } from 'next/navigation';
import { message } from 'antd';
import { z } from 'zod';

import { BASE_URL } from '@/server/const';

const loginSchema = z.object({
  username: z.string().min(3, 'Username is required'),
  password: z.string().min(5, 'Password is required'),
});

export default function useLoginForm() {
  const router = useRouter();

  const handleLogin = async (values: { username: string; password: string }) => {
    const result = loginSchema.safeParse(values);

    if (!result.success) {
      result.error.errors.forEach((err) => message.error(err.message));
      return;
    }

    const { username, password } = result.data;

    try {
      const res = await fetch(`${BASE_URL}/users?username=${username}&password=${password}`);
      const users = await res.json();

      if (users.length > 0) {
        const user = users[0];
        localStorage.setItem('user', JSON.stringify(user));
        message.success('Login successful!');
        router.push('/accounts');
      } else {
        message.error('Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      message.error('Something went wrong. Please try again.');
    }
  };

  return { handleLogin };
}
