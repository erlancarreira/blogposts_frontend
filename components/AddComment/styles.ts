import styled from 'styled-components/native';
import { TextInput, TouchableOpacity } from 'react-native';
import { StyledProps } from '@/types';

export const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  flex: 1;
`;
export const CommentImage = styled.Image`
  width: 16px; 
  height: 16px; 
`; 
export const AddCommentContainer = styled.View`
  flex: 1; 
  position: absolute;
  background-color: #fff;
  z-index: 2;
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

export const CommentButton = styled.TouchableOpacity<StyledProps>`
  flex: 1;
  flex-direction: row;
  align-items: center;
  height: 45px;
  border-radius: 8px;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 400;
  color: #666;
  background-color: #EFF1F5;
  
`;
export const CommentButtonText = styled.Text<StyledProps>`
  font-size: 14px;
  font-weight: 400;
  color: #666;
  margin-left: 8px;
`;

export const CommentInputContainer = styled.View`
  flex: 1;    
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;  

export const CommentInput = styled(TextInput).attrs({
  placeholderTextColor: "#666",
})<StyledProps>`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 48px;
  border-radius: 8px;
  margin-right: 8px;
  padding-left: 18px;
  font-size: 14px;
  font-weight: 400;
  background-color: #EFF1F5;
  
  
`;

export const SendInputButton = styled.TouchableOpacity`
  height: 48px;
  width: 48px;
  border-radius: 40px;
  padding: 0 8px;
  align-items: center;
  justify-content: center;
 
  background-color: #0F90D9;
`;

export const BackgroundEffect = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backgroundColor: rgba(0, 0, 0, 0.7);
  zIndex: 1;
`;
