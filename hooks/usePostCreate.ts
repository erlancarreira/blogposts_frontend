import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { router } from 'expo-router';
import { z } from 'zod';
import { AppDispatch } from '@/store';
import { createPost } from '@/store/slices/postsSlice';
import { toastError, toastSuccess } from '@/toast';
import { useAuth } from './useAuth';

const createPostSchema = z.object({
  title: z.string()
    .min(1, 'O título é obrigatório')
    .max(100, 'O título deve ter no máximo 100 caracteres'),
  body: z.string()
    .min(1, 'O conteúdo é obrigatório')
    .max(5000, 'O conteúdo deve ter no máximo 5000 caracteres'),
});

export function usePostCreate() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { session } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async () => {
    try {

      const result = createPostSchema.safeParse({ title: title.trim(), body: body.trim() });

      if (!result.success) {
        const errorMessage = result.error.errors[0]?.message;
        toastError(errorMessage || 'Dados inválidos');
        return;
      }

      setIsLoading(true);

      await dispatch(createPost({
        title: result.data.title,
        body: result.data.body,
        userId: Number(session?.id)
      }));

      toastSuccess('Publicação criada com sucesso!');
      router.replace('/');

    } catch (error) {

      toastError('Falha ao criar a publicação');

    } finally {

      setIsLoading(false);
      
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return {
    title,
    setTitle,
    body,
    setBody,
    isLoading,
    handleSubmit,
    handleCancel
  };
}
