import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #FFFFFF;
  justify-content: center;
  padding: 78px 20px 0 20px;
  justify-content: flex-start;
  
`;

export const Title = styled.Text`
  font-size: 24px;
  line-height: 32.74px;
  font-weight: 700;
  
  text-align: center;
  margin-bottom: 30px;
`;

export const FormContainer = styled.View`
  width: 100%;
`;

export const Label = styled.Text`
  font-size: 16px;
  font-weight: 400;
  line-height: 21.82px;
  margin-bottom: 8px;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: "#b2b6bf",
})`
  min-height: 48px;
  background-color: #eff1f5;
  border-radius: 8px;
  padding: 12px;
  gap: 10px;
  margin-bottom: 16px;
  
  color: #000; /* Define a cor do texto */
`;

export const LoginButton = styled.TouchableOpacity`
  min-height: 48px;
  background-color: #0F90D9;
  border-radius: 40px;
  padding: 12px;
  gap: 10px; 
  align-items: center;
  margin-top: 16px;
`;

export const LoginButtonText = styled.Text`
  color: #FFFFFF;
  font-size: 16px;
  line-height: 21.82px;
  font-weight: 700;
`;

export const CreateAccountButton = styled.TouchableOpacity`
  align-items: center;
  margin-top: 23px;
`;

export const CreateAccountText = styled.Text`
  color: #0094D8;
  font-size: 16px;
  line-height: 21.82px; 
  font-weight: 600;  
`;

export const ErrorText = styled.Text`
  color: red;
  margin-bottom: 10px;
  text-align: center;
`;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#FFFFFF',
//     },
//     keyboardAvoidingView: {
//         flex: 1,
//     },
//     contentContainer: {
//         flex: 1,
//         padding: 20,
//         justifyContent: 'center',
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         textAlign: 'center',
//         marginBottom: 30,
//     },
//     formContainer: {
//         width: '100%',
//     },
//     label: {
//         fontSize: 16,
//         marginBottom: 8,
//     },
//     input: {
//         backgroundColor: '#eff1f5',
//         borderRadius: 8,
//         padding: 15,
//         marginBottom: 20,
//         fontSize: 16,
//     },
//     loginButton: {
//         backgroundColor: '#0094D8',
//         borderRadius: 30,
//         padding: 15,
//         alignItems: 'center',
//         marginTop: 10,
//     },
//     loginButtonText: {
//         color: '#FFFFFF',
//         fontSize: 16,
//         fontWeight: '500',
//     },
//     createAccountButton: {
//         alignItems: 'center',
//         marginTop: 20,
//     },
//     createAccountText: {
//         color: '#0094D8',
//         fontSize: 16,
//     },
//     errorText: {
//         color: 'red',
//         marginBottom: 10,
//         textAlign: 'center',
//     },
// });