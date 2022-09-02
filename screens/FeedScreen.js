import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import React from 'react';
import PostCard from '../components/PostCard';
import usePosts from '../hooks/usePosts';

const FeedScreen = () => {
  const {posts, noMorePost, refreshing, onLoadMore, onRefresh} = usePosts();

  return (
    <FlatList
      data={posts}
      renderItem={({item}) => (
        <PostCard
          createAt={item.createdAt}
          description={item.description}
          id={item.id}
          user={item.user}
          photoURL={item.photoURL}
        />
      )}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
      onEndReached={onLoadMore} // 끝으로 내려가면 실행될 함수
      onEndReachedThreshold={0.75}
      ListFooterComponent={
        !noMorePost && (
          <ActivityIndicator style={styles.spinner} size={32} color="#6200ee" />
        )
      } // 마지막이 아닐 경우에만 인디케이터가 보이도록
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      } //refresh 시키기
    />
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 48,
  },
  spinner: {
    height: 64,
  },
});
