import { useMemo } from 'react';
import TransformText from '@/components/TransformText';
import { useDispatch, useSelector } from 'react-redux';
import { router } from 'expo-router';
import { AppDispatch, RootState } from '@/store';
import { toggleFavorite } from '@/store/slices/favoritesSlice';
import { useTheme } from '@/context/ThemeContext';
import {
    CardContainer,
    Header,
    UserInfo,
    Name,
    Username,
    SubContent,
    ActionButton,
    Title,
    ContentBody,
    UsernameContent,
} from "./styles";

import { Star } from "lucide-react-native";
import { getAvatarUser } from "@/utils";
import { transformText, withCapitalize, withLimit, withLineBreaks } from "@/utils/textTransform";
import HighlightText from '@/components/HighlightText';
import AvatarImage from '@/components/AvatarImage';
import { PostWithUser } from '@/types';

interface PostCardProps {
    post: PostWithUser;
    CardContainerStyle?: any;
}

const PostCard = ({ post, ...props }: PostCardProps) => {

    const searchQuery = useSelector((state: RootState) => state.posts.searchQuery);
    const favorites   = useSelector((state: RootState) => state.favorites.favorites);
    
    const dispatch = useDispatch<AppDispatch>();
    const { theme } = useTheme();

    const isFavorite = useMemo(() => favorites.includes(post.id), [favorites, post.id]);
    const avatarUrl  = useMemo(() => getAvatarUser(post.userId), [post.userId]);

    const handlers = useMemo(() => ({
        viewPost: () => {
            router.push(`/post/${post.id}`);
        },
        viewAuthor: () => {
            router.push(`/user/${post.userId}`);
        },
        toggleFavorite: () => {
            dispatch(toggleFavorite(post.id));
        },
        toggleFavoriteWithStop: (e: { stopPropagation: () => void }) => {
            e.stopPropagation();
            dispatch(toggleFavorite(post.id));
        }
    }), [post.id, post.userId, dispatch]);

    const postContent = {
        title: transformText(post.title, withCapitalize, withLimit(62)),
        body: post.body
    };

    return (
        <CardContainer 
            onPress={handlers.viewPost} 
            style={props.CardContainerStyle}
            
        >
            <Header>
                <UserInfo onPress={handlers.viewAuthor}>
                    <AvatarImage source={{uri: avatarUrl }} style={{ width: 40, height: 40 }} />
                    <UsernameContent>
                        <Name>
                            <TransformText
                                text={post.user?.name || ''}
                                transforms={[withCapitalize]}
                            />
                        </Name>
                        <Username>@{post.user?.username?.toLowerCase() || ''}</Username>
                    </UsernameContent>
                </UserInfo>
                <ActionButton onPress={handlers.toggleFavoriteWithStop}>
                    <Star
                        size={20}
                        color={isFavorite ? theme.colors.favorite : theme.colors.textLight}
                        fill={isFavorite ? theme.colors.favorite : 'none'}
                    />
                </ActionButton>
            </Header>
            <ContentBody>
                <Title>
                    <HighlightText
                        text={postContent.title}
                        searchTerm={searchQuery}
                    />
                </Title>
                <SubContent>
                    <TransformText
                        text={postContent.body}
                        transforms={[withCapitalize, withLineBreaks, withLimit(90)]}
                    />
                </SubContent>
            </ContentBody>
        </CardContainer>
    );
};

export default PostCard;