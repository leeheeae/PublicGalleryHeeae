import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CameraButton from '../components/CameraButton';

import HomeStack from './HomeStack';
import MyProfileStack from './MyProfileStack';
import {StyleSheet, View} from 'react-native';

const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <>
      <View style={styles.block}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#6200ee',
          }}>
          <Tab.Screen
            name="HomeStack"
            component={HomeStack}
            options={{
              tabBarIcon: ({color}) => (
                <Icon name="home" size={24} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="MyProfileStack"
            component={MyProfileStack}
            options={{
              tabBarIcon: ({color}) => (
                <Icon name="person" size={24} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </View>
      {/* 탭 위에 absolute되어야 하기 때문에 여기에 추가  */}
      <CameraButton />
    </>
  );
};

export default MainTab;

const styles = StyleSheet.create({
  block: {
    flex: 1,
    zIndex: 0,
  },
});
