import React, { memo, useCallback } from 'react';
import { FlatList } from 'react-native';
import Loading from '@/components/Loading';
import { router } from 'expo-router';
import { usePosts } from '@/hooks/usePosts';
import { useTheme } from '@/context/ThemeContext';

import DefaultContainer from '@/components/ui/DefaultContainer';
import DefaultEmpty from '@/components/ui/DefaultEmpty';

import SearchInputBar from '@/components/SearchInputBar';
import AddPostButton from '@/components/AddPostButton';
import PostCard from '@/components/PostCard';
import { Post } from '@/types';


function HomeScreen() {
  
  const { 
    filteredposts, 
    loading, 
    isSearching,
    hasMore,
    loadMorePosts,
    resetSearch 
  } = usePosts();
  const { theme } = useTheme();
  
  const renderItem = useCallback(({ item }: { item: Post}) => {
    return (
      <PostCard post={item} />
    );
  }, []);

  const handleLoadMore = useCallback(() => {
    if (filteredposts.length > 0) {
      loadMorePosts();
    }
  }, [loadMorePosts, filteredposts.length]);

  const handleCreatePost = useCallback(() => {
    router.push('/post/create');
  }, []);
  
  if (loading) {
    return (
      <Loading size="large" color={theme.colors.primary} />
    );
  }
  
  return (
    <DefaultContainer>
      <SearchInputBar />
      <FlatList
        data={filteredposts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        
        contentContainerStyle={{
          paddingTop: isSearching ? 88 : 0,
          paddingBottom: 80,
          flexGrow: filteredposts.length === 0 ? 1 : 0
        }}
        //contentOffset={isSearching ? { x: 0, y: 50 } : undefined}
        ListEmptyComponent={
          <DefaultEmpty>Nenhum post encontrado</DefaultEmpty>
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          hasMore ? (
            <Loading size="small" color={theme.colors.primary} container={{ minHeight: 201, borderRadius: 15, marginTop: 5 }} />
          ) : null
        }
        refreshing={loading}
        onRefresh={resetSearch}
        getItemLayout={(_, index) => ({
          length: 225, 
          offset: 225 * index,
          index,
        })}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={5}
        removeClippedSubviews
       
      />
      <AddPostButton onPress={handleCreatePost} />
    </DefaultContainer>
  );
}

export default memo(HomeScreen);
