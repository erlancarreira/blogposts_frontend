import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchUser, fetchUserPosts } from '@/store/slices/userSlice';
import { getAvatarUser } from '@/utils';

export function useUser(userId: string) {
  const dispatch = useDispatch<AppDispatch>();
  const { user, userPosts, loading, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    
    if (userId) {
      const id = parseInt(userId); 
      dispatch(fetchUser(id));
      dispatch(fetchUserPosts(id));
    }

  }, [dispatch, userId]);

  const avatarUrl = userId ? getAvatarUser(userId) : '';

  const fullAddress = user?.address ? `${user.address.street}, ${user.address.city}`: '';

  return {
    user,
    userPosts,
    loading,
    error,
    avatarUrl,
    fullAddress
  };
}
