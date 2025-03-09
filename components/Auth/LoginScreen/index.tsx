import React from 'react';
import { Platform, SafeAreaView } from 'react-native';
import Loading from '@/components/Loading';
import { useLogin } from '@/hooks/useLogin';
import { 
    Container, 
    CreateAccountButton, 
    CreateAccountText, 
   
    FormContainer, 
    Input, 
    Label, 
    LoginButton, 
    LoginButtonText, 
    Title 
} from './styles';

import CKeyboardAvoidingView from '@/components/CkeyboardAvoidingView';

export default function LoginScreen() {

    const {
        email,
        setEmail,
        password,
        setPassword,
        isLoading,
        handleLogin,
        handleCreateAccount
    } = useLogin();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CKeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <Container>
                    <Title>LOGIN</Title>

                    <FormContainer>
                        <Label>E-mail</Label>
                        <Input
                            placeholder="Endereço de e-mail"
                            
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                        />

                        <Label>Senha</Label>
                        <Input
                            placeholder="Senha"
                            
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />

                        <LoginButton onPress={handleLogin} disabled={isLoading}>
                            {isLoading ? (
                                <Loading color="#FFFFFF" size="small" />
                            ) : (
                                <LoginButtonText>Entrar</LoginButtonText>
                            )}
                        </LoginButton>

                        <CreateAccountButton onPress={handleCreateAccount} disabled={isLoading}>
                            <CreateAccountText>Criar nova conta</CreateAccountText>
                        </CreateAccountButton>
                    </FormContainer>
                </Container>
            </CKeyboardAvoidingView>
        </SafeAreaView>
    );
}
