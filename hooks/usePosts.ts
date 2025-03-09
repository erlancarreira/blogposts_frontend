import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useEffect, useRef } from 'react';
import { RootState, AppDispatch } from '@/store';
import {
  fetchPosts,
  setSearchQuery,
  setIsSearching,
  resetPagination,
} from '@/store/slices/postsSlice';

export const usePosts = () => {
  
  const dispatch = useDispatch<AppDispatch>();

  const {
    posts,
    loading,
    loadingMore,
    error,
    searchQuery,
    isSearching,
    hasMore,
    currentPage,
  } = useSelector((state: RootState) => state.posts);

  const searchTimeout = useRef<ReturnType<typeof setTimeout>>();

  const filteredposts = posts.filter(
    post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  const loadPosts = async () => {
    if (!loading) {
      await dispatch(fetchPosts());
    }
  };

  const loadMorePosts = async () => {
    if (!loading && !loadingMore && hasMore) {
      await dispatch(fetchPosts());
    }
  };

  const handleSearch = (query: string) => {
    dispatch(setSearchQuery(query));

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      
      dispatch(fetchPosts());
    }, 500);
  };

  const resetSearch = async () => {
    dispatch(setSearchQuery(''));
    dispatch(setIsSearching(false));
    dispatch(resetPagination());
    await dispatch(fetchPosts());
    
  };

  const handleSubmitEditing = useCallback(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    handleSearch(searchQuery);
  }, [searchQuery, handleSearch]);

  useEffect(() => {
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, []);

  return {
    posts,
    filteredposts,
    loading,
    loadingMore,
    error,
    searchQuery,
    isSearching,
    hasMore,
    currentPage,
    loadPosts,
    loadMorePosts,
    handleSearch,
    resetSearch,
    handleSubmitEditing,
  };
};
