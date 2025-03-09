import React, { useState, useRef } from 'react';
import { TextInput } from 'react-native';
import { AddCommentContainer, Container, BackgroundEffect } from './styles';
import { z } from 'zod';
import { toastError, toastSuccess } from '@/toast';
import InputSend from './InputSend';
import { addComment } from '@/store/slices/commentsSlice';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { useAuth } from '@/hooks/useAuth';
import { formatSessionUser } from '@/utils';

const commentSchema = z.object({
    comment: z.string()
        .min(1, 'O comentário não pode estar vazio')
        .max(500, 'O comentário deve ter no máximo 500 caracteres')
});

interface AddCommentProps {
    postId: number;
    
}

export default function AddComment({ postId }: AddCommentProps) {
   
    const [ isFocused, setIsFocused ] = useState(false);
    const [ comment  , setComment   ] = useState('');
    const [ showInput, setShowInput ] = useState(false);

    const dispatch = useDispatch<AppDispatch>();

    const inputRef = useRef<TextInput>(null);

    const { session } = useAuth();

    const resetForm = () => {
        setComment('');
        setShowInput(false);
        setIsFocused(false);
    };

    const handleAddComment = async () => {
        
        if (!session) {
            toastError('Você precisa estar logado para comentar');
            return;
        }

        const trimmedComment = comment.trim();
        const validation = commentSchema.safeParse({ comment: trimmedComment });
        
        if (!validation.success) {
            const errorMessage = validation.error.errors[0]?.message;
            toastError(errorMessage || 'Comentário inválido');
            return;
        }

        try {
            
            const user = formatSessionUser(session);
            
            if (!user?.name || !user?.email) {
                toastError('Dados do usuário inválidos');
                return;
            }

            await dispatch(addComment({
                postId,
                comment: {
                    name: user.name,
                    email: user.email,
                    body: trimmedComment
                }
            }));
            
            resetForm();

            toastSuccess('Comentário adicionado com sucesso');
       
        } catch (error: any) {
            toastError(error?.message || 'Erro ao adicionar comentário');
        }
    };

    const handleShowInput = (show: boolean) => {
        setShowInput(show);
        setIsFocused(show);
        if (show) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    };

    return (
        <Container>
            {isFocused && (
                <BackgroundEffect
                    activeOpacity={1}
                    onPress={() => {
                        setIsFocused(false);
                        setShowInput(false);
                    }}
                />
            )}
            <AddCommentContainer>
                <InputSend
                    showInput={showInput}
                    setShowInput={setShowInput}
                    inputRef={inputRef}
                    comment={comment}
                    setComment={setComment}
                    isFocused={isFocused}
                    setIsFocused={setIsFocused}
                    handleSubmit={handleAddComment}
                    handleShowInput={handleShowInput}
                />
            </AddCommentContainer>
        </Container>
    );
}
