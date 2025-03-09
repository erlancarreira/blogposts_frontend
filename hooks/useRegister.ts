import { useState } from 'react';
import { useSession } from '@/context/SessionContext';
import { toastError } from '@/toast';
import { z } from 'zod';
import { router } from 'expo-router';

const registerSchema = z.object({
  name: z.string()
    .min(1, 'O nome é obrigatório')
    .min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: z.string()
    .min(1, 'O e-mail é obrigatório')
    .email('Formato de e-mail inválido'),
  password: z.string()
    .min(1, 'A senha é obrigatória')
    .min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export function useRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useSession();

  const handleRegister = async () => {
    try {
      const result = registerSchema.safeParse({
        name: name.trim(),
        email: email.trim(),
        password: password.trim()
      });

      if (!result.success) {
        const errorMessage = result.error.errors[0]?.message;
        toastError(errorMessage || 'Dados inválidos');
        return;
      }

      setIsLoading(true);
      
      await register({
        name: result.data.name,
        email: result.data.email,
        password: result.data.password
      });

    } catch (error) {
      toastError(error instanceof Error ? error?.message : "Ocorreu um erro ao se cadastrar");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    handleRegister,
    handleCancel
  };
}
