
import { useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchPostDetails } from '@/store/slices/postsSlice';
import { useTheme } from '@/context/ThemeContext';
import Loading from '@/components/Loading';
import PostDetailScreen from '@/components/PostDetails';

export default function PostDetail() {

  const dispatch = useDispatch<AppDispatch>();
  
  const { id } = useLocalSearchParams();
  const { currentPost, loading } = useSelector((state: RootState) => state.posts);
  const { theme } = useTheme();

  useEffect(() => {
    if (!id) return;
    dispatch(fetchPostDetails(Number(id)));
  }, [id, dispatch]);

  if (loading || !currentPost) {
    return <Loading size="large" color={theme.colors.primary} />;
  }

  return <PostDetailScreen post={currentPost} />;
}
