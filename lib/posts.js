import fireStore from '@react-native-firebase/firestore';

export const PAGE_SIZE = 12;

// store에 posts 컬렉션 생성
const postsCollection = fireStore().collection('posts');

export function createPost({user, photoURL, description}) {
  // 데이터를 등록할 때마다 새 id를 생성해줘야하기 때문에 collection.add()를 이용
  return postsCollection.add({
    user,
    photoURL,
    description,
    //데이터가 저장되는 시점의 서버측 시간으로 저장되도록 설정
    createdAt: fireStore.FieldValue.serverTimestamp(),
  });
}

export async function getPosts({userId, mode, id} = {}) {
  //파라미터가 존재하면 where 사용하여 특정 게시글 불러오기
  let query = postsCollection.orderBy('createdAt', 'desc').limit(PAGE_SIZE);
  if (userId) {
    query = query.where('user.id', '==', userId);
  }

  //중복되는 값 줄이기 위한 작업
  if (id) {
    const cursorDoc = await postsCollection.doc(id).get();
    query =
      mode === 'older'
        ? query.startAfter(cursorDoc)
        : query.endBefore(cursorDoc);
  }

  //해당 컬렉션의 QuerySnapshot 객체가 반환됨
  //QuerySnapshot 객체 내부에 docs라는 배열이 있고, 이 배열 안에 각 문서에 대한 정보가 있음 (조회 결과가 없을 경우 빈 배열)
  const snapshot = await query.get();

  const posts = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
  return posts;
}

// 보여지고 있는 포스트의 이전 포스트들 들고오기
export async function getOlderPosts(id, userId) {
  return getPosts({
    id,
    mode: 'older',
    userId,
  });
}

// 새로운 문서 조회
export async function getNewerPosts(id, userId) {
  return getPosts({
    id,
    mode: 'newer',
    userId,
  });
}

//삭제
export function removePost(id) {
  return postsCollection.doc(id).delete();
}

//업데이트
export function updatePost({id, description}) {
  return postsCollection.doc(id).update({
    description,
  });
}
