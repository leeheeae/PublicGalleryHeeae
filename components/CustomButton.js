import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CustomButton = ({onPress, title, hasMarginBottom, theme}) => {
  const isPrimary = theme === 'primary';

  return (
    <View
      style={[styles.block, styles.overflow, hasMarginBottom && styles.margin]}>
      {/* ios는 opacity 효과 안드로이드는 물결효과  */}
      <Pressable
        onPress={onPress}
        style={({pressed}) => [
          styles.wrapper,
          isPrimary && styles.primaryWrapper,
          Platform.OS === 'ios' && pressed && {opacity: 0.5},
        ]}
        android_ripple={{color: isPrimary ? '#FFF' : '#6200ee'}}>
        <Text
          style={[
            styles.text,
            isPrimary ? styles.primaryText : styles.secondaryText,
          ]}>
          {title}
        </Text>
      </Pressable>
    </View>
  );
};

CustomButton.defaultProps = {
  theme: 'primary',
};

export default CustomButton;

const styles = StyleSheet.create({
  block: {},
  overflow: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  wrapper: {
    borderRadius: 4,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryWrapper: {
    backgroundColor: '#6200ee',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#FFF',
  },
  primaryText: {color: '#FFF'},
  secondaryText: {
    color: '#6200ee',
  },
  margin: {
    marginBottom: 8,
  },
});
