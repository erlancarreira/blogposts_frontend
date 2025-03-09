import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { toggleFavorite, clearFavorites } from '@/store/slices/favoritesSlice';

export function useFavorites() {
    const dispatch = useDispatch();
    const { posts, searchQuery, isSearching } = useSelector((state: RootState) => state.posts);
    const { favorites } = useSelector((state: RootState) => state.favorites);

    const favoritePosts = posts.filter(post => favorites.includes(post.id));

    const filteredFavorites = favoritePosts.filter(
        post =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.body.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const isFavorite = useCallback((postId: number) => {
        return favorites.includes(postId);
    }, [favorites]);

    const togglePostFavorite = useCallback((postId: number) => {
        dispatch(toggleFavorite(postId));
    }, [dispatch]);

    const removeAllFavorites = useCallback(() => {
        dispatch(clearFavorites());
    }, [dispatch]);

    return {
        favorites,
        favoritePosts,
        filteredFavorites,
        isSearching,
        isFavorite,
        togglePostFavorite,
        removeAllFavorites
    };
}
