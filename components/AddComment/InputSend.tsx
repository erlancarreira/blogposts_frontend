import { ArrowRight } from "lucide-react-native";
import { TextInput } from "react-native";
import { CommentButton, CommentButtonText, CommentImage, CommentInput, CommentInputContainer, SendInputButton } from "./styles";
import CommentChatIcon from '@/assets/images/comment_chat_icon.png';
import React from 'react';

interface InputSendProps {
    showInput: boolean;
    setShowInput: (value: boolean) => void;
    inputRef: React.RefObject<TextInput>;
    comment: string;
    setComment: (value: string) => void;
    isFocused: boolean;
    setIsFocused: (value: boolean) => void;
    handleSubmit: () => void;
    handleShowInput: (show: boolean) => void;
}

export default function InputSend({
    showInput,
    inputRef,
    comment,
    setComment,
    isFocused,
    setIsFocused,
    handleSubmit,
    handleShowInput
}: InputSendProps) {
    
    if (!showInput) {
        return <CommentButton onPress={() => handleShowInput(true)}>
            <CommentImage source={CommentChatIcon} />
            <CommentButtonText>
                Adicione um comentário
            </CommentButtonText>
        </CommentButton>; 
    } else {
        return (
            <CommentInputContainer style={{ zIndex: 999, position: 'relative' }}>
                <CommentInput
                    ref={inputRef}
                    placeholder="Adicione um comentário"
                    value={comment}
                    onChangeText={setComment}
                    onFocus={() => {
                        setIsFocused(true);
                    }}
                    onBlur={() => {
                        setIsFocused(false);
                        handleShowInput(false);
                    }}
                    onSubmitEditing={handleSubmit}
                    returnKeyType="send"
                    isFocused={isFocused}
                    style={{
                        zIndex: 999
                    }}
                />
                <SendInputButton onPress={handleSubmit}>
                    <ArrowRight size={24} color="#fff" />
                </SendInputButton>
            </CommentInputContainer>
        );
    }
}