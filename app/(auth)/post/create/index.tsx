import React from 'react';
import Loading from '@/components/Loading';
import { useTheme } from '@/context/ThemeContext';
import { usePostCreate } from '@/hooks/usePostCreate';
import { Send, X } from 'lucide-react-native';
import CKeyboardAvoidingView from '@/components/CkeyboardAvoidingView';
import {
  Container,
  Label,
  Input,
  TextArea,
  SubmitButton,
  SubmitButtonText,
  SubmitButtonContainer,
  Header,
  BackButton,
  HeaderTitle,
  HeaderRight,
  HeaderContainer,
  FormContainer
} from '@/components/ui/post/create/styles';

export default function CreatePostScreen() {
  const { theme } = useTheme();
  const {
    title,
    setTitle,
    body,
    setBody,
    isLoading,
    handleSubmit,
    handleCancel
  } = usePostCreate();

  return (
    <CKeyboardAvoidingView>
      <Container>
        <HeaderContainer>
          <Header>
            <BackButton onPress={handleCancel}>
              <X size={24} color="#000" />
            </BackButton>
            <HeaderTitle>Nova publicação</HeaderTitle>
            <HeaderRight />
          </Header>
        </HeaderContainer>
        <FormContainer>
          <Label>Título da publicação</Label>
          <Input
            placeholder="Adicione um título"
            placeholderTextColor={theme.colors.textLight}
            value={title}
            onChangeText={setTitle}
          />
          <Label>Texto da publicação</Label>
          <TextArea
            placeholder="O que gostaria de compartilhar?"
            placeholderTextColor={theme.colors.textLight}
            multiline
            numberOfLines={10}
            textAlignVertical="top"
            value={body}
            onChangeText={setBody}
          />
          
          <SubmitButtonContainer>
            <SubmitButton onPress={handleSubmit} disabled={isLoading}>
              {isLoading ? (
                <Loading size="small" color="#FFFFFF" backgroundColor='transparent'  />
              ) : (
                <>
                  <Send
                    size={15}
                    color="#fff"
                    style={{ marginRight: 8 }}
                  />
                  <SubmitButtonText>Publicar</SubmitButtonText>
                </>
              )}
            </SubmitButton>
          </SubmitButtonContainer>
        </FormContainer>
      </Container>
    </CKeyboardAvoidingView>
  );
}
