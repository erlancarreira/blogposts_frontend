import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import Loading from '@/components/Loading';
import { router, useLocalSearchParams } from 'expo-router';
import PostCard from '@/components/PostCard';
import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/hooks/useUser';

import {
  Container,
  PerfilHeader,
  UserInfo,
  UserName,
  UserUsername,
  DetailItem,
  DetailValue,
  EmptyText,
  PerfilContainer,
  Header,
  BackButton,
  HeaderTitle,
  HeaderRight,
  DetailContainer
} from '@/components/ui/user/styles';

import {  MapPin, Phone, Mail, BriefcaseBusiness, ArrowLeft } from 'lucide-react-native';

import AvatarImage from '@/components/AvatarImage';

import { PostWithUser } from '@/types';

export default function PerfilScreen() {

  const { id } = useLocalSearchParams<{ id: string }>();
  
  const { user, userPosts, loading, avatarUrl, fullAddress } = useUser(id);
  const { theme } = useTheme();

  const handleCancel = () => {
    router.back();
  };

  const RenderItem = useCallback( ({ item, index }: { item: PostWithUser; index: number; }) => <PostCard
    post={item}
    CardContainerStyle={{ 
      marginLeft: 13, 
      marginRight: 13, 
      marginTop: index === 0 ? 14 : 5 
    }}
  />, []);

  if (loading) {
    return (
      <Loading size="large" color={theme.colors.primary} />
    );
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={handleCancel}>
            <ArrowLeft size={24} color="#000" />
        </BackButton>
        <HeaderTitle>Perfil</HeaderTitle>
        <HeaderRight />
      </Header>
      <FlatList
        data={userPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={RenderItem}
        ListHeaderComponent={
          <>
            <PerfilContainer>
              <PerfilHeader>
                <AvatarImage source={{ uri: avatarUrl }} style={{ width: 67, height: 67 }} />
                <UserInfo>
                  <UserName>{user?.name}</UserName>
                  <UserUsername>@{user?.username?.toLowerCase()}</UserUsername>
                </UserInfo>
              </PerfilHeader>

              <DetailContainer>
                <DetailItem>
                  <Mail size={16} color={theme.colors.black} />
                  <DetailValue>{user?.email?.toLowerCase()}</DetailValue>
                </DetailItem>  
                
                
                <DetailItem>
                  <MapPin size={16} color={theme.colors.black} />
                  <DetailValue>{fullAddress}</DetailValue>
                </DetailItem>
            
                <DetailItem>
                  <BriefcaseBusiness size={16} color={theme.colors.black} />
                  <DetailValue>{user?.company?.name}</DetailValue>
                  
                </DetailItem>

                <DetailItem>
                  <Phone size={16} color={theme.colors.black} /> 
                  <DetailValue>{user?.phone}</DetailValue>
                </DetailItem>
              
              </DetailContainer>
            </PerfilContainer>
          </>
        }
        ListEmptyComponent={
          <EmptyText>Nenhum post encontrado!</EmptyText>
        }
        contentContainerStyle={{
          paddingBottom: 20,
          flexGrow: userPosts.length === 0 ? 1 : 0
        }}
        
      />
    </Container>
  );
}
