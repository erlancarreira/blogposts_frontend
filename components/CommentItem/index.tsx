import React from 'react';
import { router } from 'expo-router';
import { Comment } from '@/types';

import {
  CommentContainer,
  CommentHeader,
  CommentAuthor,
  CommentEmail,
  CommentBody
} from './styles';

interface CommentItemProps {
  comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  
  const extractUserId = (email: string) => {
    const hash = email.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (hash % 10) + 1;
  };
  
  const handleAuthorPress = () => {
    const userId = extractUserId(comment.email);
    router.push(`/user/${userId}`);
  };
  
  return (
    <CommentContainer>
      <CommentHeader onPress={handleAuthorPress}>
        <CommentAuthor>{comment.name}</CommentAuthor>
        <CommentEmail>{comment.email}</CommentEmail>
      </CommentHeader>
      <CommentBody>{comment.body}</CommentBody>
    </CommentContainer>
  );
};

export default CommentItem;