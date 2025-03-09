import styled from 'styled-components/native';

import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { TouchableOpacity, Image } from 'react-native';
import { StyledProps } from '@/types';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const STATUSBAR_HEIGHT = getStatusBarHeight();

export const Container = styled.View<StyledProps>`
  flex: 1;
  background-color: ${(props: StyledProps) => props.theme.colors.backgroundLight};
  margin-top: ${STATUSBAR_HEIGHT}px;
`;

export const Content = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

export const Title = styled.Text<StyledProps>`
  font-size: 24px;
  font-weight: bold;
  color: ${(props: StyledProps) => props.theme.colors.text};
  margin-bottom: 16px;
`;

export const Body = styled.Text<StyledProps>`
  font-size: 16px;
  color: ${(props: StyledProps) => props.theme.colors.text};
  line-height: 24px;
`;

export const LoadingContainer = styled.View<StyledProps>`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props: StyledProps) => props.theme.colors.background};
`;




export const BackgroundEffect = styled(TouchableOpacity)`
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  
  width: 100% ;
   
`;

export const ScrollContent = styled(ScrollView)``;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  
  padding: 12px 16px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
  min-height: 56px;
`;

export const BackButton = styled(TouchableOpacity)`
  
  margin-right: 16px;
`;

export const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
`;

export const HeaderRight = styled.View`
  width: 24px;
`;

export const PostContainer = styled.View`
  padding: 0 16px;
`;

export const AuthorContainer = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
  margin-top: 16px;
  
`;

export const Avatar = styled(Image)`
  width: 48px;
  height: 48px;
  border-radius: 24px;
`;

export const AuthorInfo = styled.View`
  flex: 1;
  margin-left: 8px;
  
`;

export const AuthorName = styled.Text`
 
  font-weight: 700;
  font-size: 16px;
  line-height: 21.82px;
 

`;

export const AuthorUsername = styled.Text`
  font-weight: 400;
  font-size: 14px;
  line-height: 19.1px;
  color: #5E6064;

`;

export const StarButton = styled(TouchableOpacity)`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0 6px;
`;

export const PostContent = styled.View`
  margin-bottom: 20px;
`;

export const PostTitle = styled.Text`
  
  font-weight: 700;
  font-size: 24px;
  line-height: 32.74px;
  margin-bottom: 12px;
  
`;

export const PostText = styled.Text`
  
  color: #1C1F24;
  
  margin-bottom: 12px;
  width: 100%;
  
  font-weight: 400;
  font-size: 16px;
  line-height: 21.82px;
  

`;

export const CommentsSection = styled.View`
  margin-top: 8px;
`;

export const CommentBox = styled.View`
  border-top-width   : 2px;
  border-bottom-width: 1px;
  border-color       : #eee;
  
  flex-direction     : row;
  align-items        : center;
`;

export const Divider = styled.View`
  height: 1px;
  background-color: #eee;
  margin-vertical: 16px;
`;

export const CommentsTitle = styled.Text`
  padding : 12px 0px;
  margin-left : 20px;
  font-weight: 700;
  font-size: 20px;
  line-height: 27.28px;

  gap: 8px;
  


`;



export const CommentContainer = styled.View`
  flex-direction: column;
  
  padding: 12px 0px;
  border-bottom-width: 1px;
  border-color       : rgba(94, 96, 100, 0.2);
  

`;

export const CommentContent = styled.View`
  flex: 1;
  margin-left: 12px;
`;

export const CommentAuthor = styled.Text`
  
  font-weight: 400;
  font-size: 16px;
  line-height: 21.82px;
  color: #5e6064;
  
`;

export const CommentText = styled.Text`
  
  font-weight: 600;
  font-size: 16px;
  line-height: 21.82px;
  color: #1C1F24;
  
`;

export const AddCommentContainer = styled.View`
  position: absolute;  /* Fixa na tela */
  background-color: #fff;
  z-index: 3;
  bottom: 0;
  left: 0;
  right: 0;
  
  border-top-width: 1px;
  border-top-color: #eee;
  padding: 16px;

  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

export const CommentInput = styled(TextInput).attrs({
  placeholderTextColor: "#000",
}) <StyledProps>`
  flex: 1;
  justifyContent: 'center'; 
  alignItems: 'center';
  height: 45px;
  
  border-radius: 8px;
  padding-left: 45px;
  font-size: 14px;
  font-weight: 400;
  background-color: ${(props: StyledProps) => props.theme.colors.background};
`;