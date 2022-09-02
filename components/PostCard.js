import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import Avatar from './Avatar';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import {useUserContext} from '../contexts/UserContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ActionSheetModal from './ActionSheetModal';
import usePostActions from '../hooks/usePostActions';

const PostCard = ({user, photoURL, description, createAt, id}) => {
  const routeNames = useNavigationState(state => state.routeNames);
  const navigation = useNavigation();
  const {user: me} = useUserContext();
  const isMyPost = me.id === user.id;

  const date = useMemo(
    () => (createAt ? new Date(createAt._seconds * 1000) : new Date()),
    [createAt],
  );

  const onOpenProfile = () => {
    //routeNames에 해당 스택이 이미 있는 경우 찾아서 네비게이션 설정
    if (routeNames.find(routeName => routeName === 'MyProfile')) {
      navigation.navigate('MyProfile');
    } else {
      navigation.navigate('Profile', {
        userId: user.id,
        displayName: user.displayName,
      });
    }
  };

  const {isSelecting, onPressMore, onClose, actions} = usePostActions({
    id,
    description,
  });

  return (
    <>
      <View style={styles.block}>
        <View style={[styles.head, styles.paddingBlock]}>
          <Pressable style={styles.profile} onPress={onOpenProfile}>
            <Avatar source={user.photoURL && {uri: user.photoURL}} />
            <Text style={styles.displayName}>{user.displayName}</Text>
          </Pressable>
          {isMyPost && (
            // 컴포넌트 크기는 그대로 유지하고 터치할 수 있는 영역만 각 방향으로 해당 값만큼 늘려주는것
            <Pressable hitSlop={8} onPress={onPressMore}>
              <Icon name="more-vert" size={20} />
            </Pressable>
          )}
        </View>
        <Image
          source={{uri: photoURL}}
          resizeMode="cover"
          resizeMethod="resize"
          style={styles.image}
        />
        <View style={styles.paddingBlock}>
          <Text style={styles.description}>{description}</Text>
          {/* ??? */}
          <Text style={styles.date} date={date}>
            {date.toLocaleString()}
          </Text>
        </View>
      </View>
      <ActionSheetModal
        visible={isSelecting}
        actions={actions}
        onClose={onClose}
      />
    </>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  block: {
    paddingVertical: 16,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  paddingBlock: {
    paddingHorizontal: 16,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  displayName: {
    lineHeight: 16,
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  image: {
    backgroundColor: '#bdbdbd',
    width: '100%',
    aspectRatio: 1, // 정의되지 않은 차원의 크기를 제어
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  date: {
    color: '#757575',
    fontSize: 12,
    lineHeight: 18,
  },
});
