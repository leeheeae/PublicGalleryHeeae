import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getNewerPosts, getOlderPosts, getPosts, PAGE_SIZE} from '../lib/posts';
import {getUser} from '../lib/users';
import Avatar from './Avatar';
import PostGridItem from './PostGridItem';
import usePosts from '../hooks/usePosts';

const Profile = ({userId}) => {
  const [user, setUser] = useState(null);
  const {posts, noMorePost, refreshing, onLoadMore, onRefresh} =
    usePosts(userId);

  useEffect(() => {
    getUser(userId).then(setUser);
  }, [userId]);

  // 유저정보나 게시글이 없을 경우 (프로필 컴포넌트기 때문에 둘 중에 하나의 값을 필수로 있음)
  if (!user || !posts) {
    return (
      <ActivityIndicator style={styles.spinner} size={32} color="#6200ee" />
    );
  }

  return (
    <FlatList
      style={styles.block}
      data={posts}
      renderItem={({item}) => <PostGridItem post={item} />}
      numColumns={3}
      keyExtractor={item => item.id}
      ListHeaderComponent={
        <View style={styles.userInfo}>
          <Avatar source={user.photoURL && {uri: user.photoURL}} size={128} />
          <Text style={styles.username}>{user.displayName}</Text>
        </View>
      }
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.75}
      ListFooterComponent={
        !noMorePost && (
          <ActivityIndicator
            style={styles.bottomSpinenr}
            size={32}
            color="#6200ee"
          />
        )
      }
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
    />
  );
};

export default Profile;

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: 'center',
  },
  block: {
    flex: 1,
  },
  userInfo: {
    paddingTop: 80,
    paddingBottom: 64,
    alignItems: 'center',
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 64,
  },
  username: {
    marginTop: 8,
    fontSize: 24,
    color: '#424242',
  },
  bottomSpinenr: {
    height: 128,
  },
});
