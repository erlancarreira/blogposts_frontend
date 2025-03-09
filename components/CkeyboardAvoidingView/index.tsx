import { 
    KeyboardAvoidingView,
    KeyboardAvoidingViewProps,
    Platform
    
} from 'react-native';

export default function CKeyboardAvoidingView({children, ...props}: KeyboardAvoidingViewProps) {
    return <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        {...props}
    >{children}</KeyboardAvoidingView>
}