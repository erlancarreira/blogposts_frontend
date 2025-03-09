import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useSession } from '@/context/SessionContext';
import { toastError } from '@/toast';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string()
    .min(1, 'O e-mail é obrigatório')
    .email('Formato de e-mail inválido'),
  password: z.string()
    .min(1, 'A senha é obrigatória')
    .min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

export type LoginInput = z.infer<typeof loginSchema>;

export function useLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { signIn } = useSession();

  const handleLogin = async () => {
    try {
      const result = loginSchema.safeParse({
        email: email.trim(),
        password: password.trim()
      });

      if (!result.success) {
        const errorMessage = result.error.errors[0]?.message;
        toastError(errorMessage || 'Dados inválidos');
        return;
      }

      setIsLoading(true);
      await signIn({
        email: result.data.email,
        password: result.data.password
      });
      
    } catch (error) {
      toastError(error instanceof Error ? error.message : "Ocorreu um erro ao fazer o login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAccount = () => {
    router.push('/cadastrar');
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    handleLogin,
    handleCreateAccount
  };
}
