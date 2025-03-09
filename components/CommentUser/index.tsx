import React, { useCallback } from 'react';
import { Comment } from '@/types';
import AvatarImage from '@/components/AvatarImage';
import {
  Container,
  Name,
  AvatarContainer,
  ContentContainer
} from './styles';
import { capitalize, getAvatarUser } from '@/utils';
import { CommentText } from '@/components/PostDetails/styles';
import TransformText from '@/components/TransformText';
import { withLimit, withLineBreaks } from '@/utils/textTransform';
import { router } from 'expo-router';

interface CommentUserProps {
  
  comment: Comment;
  onPress?: () => void;
}

const CommentUser: React.FC<CommentUserProps> = ({ comment }) => {
  
  const handleUserProfile = useCallback(() => {
    if (comment?.id) {
      router.push(`/user/${comment.id}`);
    }
  }, [comment.id]);

  const avatarUrl = getAvatarUser(comment?.id);

  return (
    <Container onPress={handleUserProfile}>
      <AvatarContainer>
        <AvatarImage
          source={{ uri: avatarUrl }}
          style={{ width: 24, height: 24 }}
        />
      </AvatarContainer>
      <ContentContainer>
        <Name>
          <TransformText
            text={comment?.body}
            transforms={[ capitalize, withLineBreaks, withLimit(18, '')]}
          />
        </Name>
        <CommentText>
          <TransformText
            text={comment?.body}
            transforms={[ capitalize, withLineBreaks, withLimit(122)]}
          />
        </CommentText>
      </ContentContainer>
      
    </Container>
  );
};

export default CommentUser;