import React, { memo, useCallback } from 'react';
import { FlatList } from 'react-native';
import Loading from '@/components/Loading';
import PostCard from '@/components/PostCard';
import SearchInputBar from '@/components/SearchInputBar';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useTheme } from '@/context/ThemeContext';

import { Post } from '@/types';
import { useFavorites } from '@/hooks/useFavorites';

import DefaultContainer from '@/components/ui/DefaultContainer';
import DefaultEmpty from '@/components/ui/DefaultEmpty';

const PostItem = memo(({ post }: { post: Post }) => {
  return <PostCard post={post} />;
});

export default function FavoritesScreen() {
  const { loading } = useSelector((state: RootState) => state.posts);
  const { theme } = useTheme();
  const { filteredFavorites, isSearching } = useFavorites();

  const renderItem = useCallback(({ item }: { item: Post }) => (
    <PostItem post={item} />
  ), []);

  if (loading) {
    return <Loading size="large" color={theme.colors.primary} />;
  }

  return (
    <DefaultContainer>
      <SearchInputBar />
      <FlatList
        data={filteredFavorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingTop: isSearching ? 88 : 0,
          paddingBottom: 80,
          flexGrow: filteredFavorites.length === 0 ? 1 : 0
        }}
        ListEmptyComponent={
          <DefaultEmpty>Você ainda não favoritou nenhum post!</DefaultEmpty>
        }
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

    </DefaultContainer>
  );
}
