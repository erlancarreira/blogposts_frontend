import { useState } from 'react';
import { ImageProps, ImageSourcePropType } from 'react-native';
import { Avatar } from './styled';
import { DEFAULT_AVATAR_MALE } from '@/constants';

interface AvatarImageProps extends Omit<ImageProps, 'source'> {
    source: ImageSourcePropType;
}

const AvatarImage = ({ source, ...props }: AvatarImageProps) => {

    const [ imageSource, setImageSource ] = useState<ImageSourcePropType>(source);

    return (
        <Avatar
            source={imageSource}
            onError={() => setImageSource({ uri: DEFAULT_AVATAR_MALE })}
            {...props}
        />
    );
};

export default AvatarImage;
