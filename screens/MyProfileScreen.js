import {StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';

import Profile from '../components/Profile';
import {useUserContext} from '../contexts/UserContext';

const MyProfileScreen = () => {
  const {user} = useUserContext();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: user.displayName,
    });
  }, [navigation, user]);

  return <Profile userId={user.id} />;
};

export default MyProfileScreen;

const styles = StyleSheet.create({});
