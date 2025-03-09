import React, { useEffect } from 'react';
import { useNavigation } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';

import {
    Header,
    HeaderContent,
    SearchWrapper,
    SearchContainer,
    SearchInput,
    SearchButtonCancel,
    ContainerButtonCancel
} from './styled';
import { usePosts } from '@/hooks/usePosts';

export default function SearchInputBar() {
    const { isSearching, handleSearch, handleSubmitEditing, searchQuery, resetSearch } = usePosts();
    const { theme } = useTheme();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerShown: !isSearching
        });
    }, [isSearching, navigation]);

    if (!isSearching) return null;

    return (
        <Header>
            <HeaderContent>
                <SearchWrapper>
                    <SearchContainer>
                        <SearchInput
                            placeholder="Buscar publicação"
                            placeholderTextColor={theme.colors.textLight}
                            value={searchQuery}
                            onChangeText={handleSearch} // Agora usa debounce
                            onEndReached={handleSubmitEditing} // Chamando a busca corretamente
                            autoFocus
                            returnKeyType="search"
                        />
                    </SearchContainer>
                    <ContainerButtonCancel onPress={resetSearch}>
                        <SearchButtonCancel>Cancelar</SearchButtonCancel>
                    </ContainerButtonCancel>
                </SearchWrapper>
            </HeaderContent>
        </Header>
    );
}
