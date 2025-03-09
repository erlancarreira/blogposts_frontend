import React from 'react';
import { ActivityIndicator, ViewStyle } from 'react-native';

import { Animated } from 'react-native';
import { LoadingContainer } from './styles';


type LoadingProps = {
    size?: 'small' | 'large';
    color?: string;
    backgroundColor?: string;
    container?: ViewStyle;
};

const Loading: React.FC<LoadingProps> = ({ 
    size = 'large', 
    color = '#6200ea', 
    backgroundColor = 'rgba(255, 255, 255, 0.7)',
    container = {}
}) => {

    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    return (
        <LoadingContainer style={{ opacity: fadeAnim, backgroundColor, ...container }}>
            <ActivityIndicator size={size} color={color} />
        </LoadingContainer>
    );
};


export default Loading;
