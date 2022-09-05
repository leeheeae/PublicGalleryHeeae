import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useUserContext} from '../contexts/UserContext';
import {signOut} from '../lib/auth';

const SettingScreen = () => {
  const {setUser} = useUserContext();

  const onLogout = async () => {
    await signOut();
    setUser(null);
  };

  return (
    <View style={styles.block}>
      <Pressable
        onPress={onLogout}
        style={({pressed}) => [
          styles.item,
          pressed && Platform.select({ios: {opacity: 0.5}}),
        ]}
        android_ripple={{color: '#eee'}}>
        <Text>로그아웃</Text>
      </Pressable>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  block: {
    flex: 1,
    paddingTop: 32,
  },
  item: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    bordercolor: '#eee',
    backgroundColor: '#FFF',
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  itemText: {
    fontSize: 16,
  },
});
