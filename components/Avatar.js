import {Image} from 'react-native';
import React from 'react';

//반복되는 아바타 컴포넌트 코드 리팩토링
const Avatar = ({source, size = 32, style}) => {
  return (
    <Image
      source={source || require('../assets/user.png')}
      resizeMode="cover"
      style={[style, {width: size, height: size, borderRadius: size / 2}]}
    />
  );
};

export default Avatar;
