import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import PostCard from '../components/PostCard';

const PostScreen = () => {
  const route = useRoute();
  const {post} = route.params;

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <PostCard
        user={post.user}
        photoURL={post.photoURL}
        description={post.description}
        createAt={post.createAt}
        id={post.id}
      />
    </ScrollView>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 40,
  },
});
