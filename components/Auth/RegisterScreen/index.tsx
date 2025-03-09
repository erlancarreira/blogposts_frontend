import React from 'react';
import { SafeAreaView } from 'react-native';
import Loading from '@/components/Loading';
import { useRegister } from '@/hooks/useRegister';
import { 
    HeaderContainer,
    HeaderTitle,
    Container, 
    FormContainer, 
    Input, 
    Label, 
    LoginButton, 
    LoginButtonText,
    HeaderContainerTitle, 
   
} from './styles';

import CKeyboardAvoidingView from '@/components/CkeyboardAvoidingView';

import { DefaultBackButton } from '@/components/ui/DefaultBackButton';
import { ArrowLeft } from 'lucide-react-native';

export default function RegisterScreen() {
    const {
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        isLoading,
        handleRegister,
        handleCancel
    } = useRegister();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CKeyboardAvoidingView>
                <HeaderContainer>
                    <HeaderContainerTitle>
                        <DefaultBackButton onPress={handleCancel}>
                            <ArrowLeft size={24} color="#000" />
                        </DefaultBackButton>
                        <HeaderTitle>Criar nova conta</HeaderTitle>
                    </HeaderContainerTitle>
                </HeaderContainer>
                <Container>
                    <FormContainer>
                        <Label>Nome de usuário</Label>
                        <Input
                            placeholder="Nome de usuário"
                            keyboardType="default" 
                            autoCapitalize="words" 
                            value={name}
                            onChangeText={setName}
                        />
                        <Label>E-mail</Label>
                        <Input
                            placeholder="Endereço de e-mail"
                            placeholderTextColor="#b2b6bf"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                        />

                        <Label>Senha</Label>
                        <Input
                            placeholder="Senha"
                            placeholderTextColor="#b2b6bf"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />

                        <LoginButton onPress={handleRegister} disabled={isLoading}>
                            {isLoading ? (
                                <Loading color="#FFFFFF" size="small" />
                            ) : (
                                <LoginButtonText>Criar Conta</LoginButtonText>
                            )}
                        </LoginButton>
                    </FormContainer>
                </Container>
            </CKeyboardAvoidingView>
        </SafeAreaView>
    );
}
