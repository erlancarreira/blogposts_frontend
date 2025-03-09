import React from 'react';
import { Text, TextProps } from 'react-native';
import { transformText, TransformFunction } from '@/utils/textTransform';

interface TransformTextProps extends Omit<TextProps, 'children'> {
    text: string;
    transforms: TransformFunction[];
}

export default function TransformText({ text, transforms, ...props }: TransformTextProps) {
    const transformedText = transformText(text, ...transforms);
    return <Text {...props}>{transformedText}</Text>;
}