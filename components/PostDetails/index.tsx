import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Star } from 'lucide-react-native';
import { router } from 'expo-router';

import {
    AuthorContainer,
    AuthorInfo,
    AuthorName,
    AuthorUsername,
    StarButton,
    PostContainer,
    PostContent,
    PostTitle,
    PostText,
    CommentsSection,
    CommentBox,
    CommentsTitle,
    CommentContainer,
    ScrollContent,
    Container,
    Header,
    BackButton,
    HeaderTitle,
} from './styles';

import AddComment from '@/components/AddComment';
import CommentUser from '@/components/CommentUser';
import { Comment, Post } from '@/types';
import { getAvatarUser } from '@/utils';
import { withCapitalize, withLimit, withLineBreaks } from '@/utils/textTransform';
import TransformText from '@/components/TransformText';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '@/store/slices/favoritesSlice';
import { AppDispatch, RootState } from '@/store';
import { useTheme } from '@/context/ThemeContext';
import { fetchComments } from '@/store/slices/commentsSlice';

import Loading from '@/components/Loading';
import AvatarImage from '@/components/AvatarImage';

interface PostDetailScreenProps {
    post: Post;
}

export default function PostDetailScreen({ post }: PostDetailScreenProps): JSX.Element {

    const dispatch = useDispatch<AppDispatch>();

    const favorites = useSelector((state: RootState) => state.favorites.favorites);
    const isFavorite = favorites.includes(Number(post.id));

    const { comments, loading: commentsLoading } = useSelector((state: RootState) => state.comments);
    const { currentUser: user } = useSelector((state: RootState) => state.posts);
    const { theme } = useTheme();

    const handleFavorite = useCallback(() => {
        dispatch(toggleFavorite(Number(post.id)));
    }, [dispatch, post.id]);

    const handleUserProfile = useCallback(() => {
        router.push(`/user/${post.userId}`);
    }, [post.userId]);

    const handleCancel = useCallback(() => {
        router.back();
    }, []);

    useEffect(() => {
        dispatch(fetchComments(post.id));

    }, [dispatch, post.id]);

    const avatarUrl = useMemo(() => getAvatarUser(post.userId), [post.userId]);
   
    return (

        <Container>
            <Header>
                <BackButton onPress={handleCancel}>
                    <ArrowLeft size={24} color="#000" />
                </BackButton>
                <HeaderTitle>Publicação</HeaderTitle>
            </Header>

            <ScrollContent contentContainerStyle={{ paddingBottom: 82 }}>
                <PostContainer>
                    <AuthorContainer onPress={handleUserProfile}>
                        <AvatarImage source={{ uri: avatarUrl }} style={{ width: 48, height: 48, borderRadius: 24 }} />
                        <AuthorInfo>
                            <AuthorName>{user?.name}</AuthorName>
                            <AuthorUsername>@{user?.username?.toLowerCase()}</AuthorUsername>
                        </AuthorInfo>
                        <StarButton onPress={handleFavorite}>
                            <Star
                                size={24}
                                color={isFavorite ? theme.colors.favorite : theme.colors.textLight}
                                fill={isFavorite ? theme.colors.favorite : 'none'}
                            />
                        </StarButton>
                    </AuthorContainer>

                    <PostContent>
                        <PostTitle>
                            <TransformText
                                text={post.title}
                                transforms={[withCapitalize, withLimit(62)]}
                            />
                        </PostTitle>
                        <PostText>
                            <TransformText
                                text={post.body}
                                transforms={[withCapitalize, withLineBreaks]}
                            />
                        </PostText>
                    </PostContent>
                </PostContainer>

                <CommentsSection>
                    <CommentBox>
                        <CommentsTitle>Comentários</CommentsTitle>
                    </CommentBox>
                    
                    {commentsLoading ? (
                        <Loading size="small" color={theme.colors.primary} />
                    ) : (
                        comments.map((item: Comment ) => (
                            <CommentContainer key={item.id}>
                                <CommentUser comment={item} />
                            </CommentContainer>
                        ))
                    )}
                </CommentsSection>

            </ScrollContent>
            <AddComment postId={post.id} />
        </Container>

    );
}
