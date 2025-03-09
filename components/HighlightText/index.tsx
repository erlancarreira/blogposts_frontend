import React from "react";
import { Text } from "react-native";

interface HighlightTextProps {
    text: string; 
    searchTerm: string; 
    highlightColor?: string;
} 

export default function HighlightText({text, searchTerm, highlightColor = "#1C1F2466"}: HighlightTextProps) {
    if (!searchTerm) return text;

    const regex = new RegExp(`(${searchTerm})`, "gi");
    const parts = text.split(regex); 

    return parts.map((part, index) =>
        part.toLowerCase() === searchTerm.toLowerCase() ? (
            part
        ) : (
            <Text key={index} style={{ color: highlightColor }}>
                {part}
            </Text>
        )
    );
}
