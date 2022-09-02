import firestore from '@react-native-firebase/firestore';

//컬렉션 생성
export const usersCollection = firestore().collection('users');

//주어진 파라미터를 고유ID로 가지고 있는 문서에 주어진 정보들을 설정해 저장
export function createUser({id, displayName, photoURL}) {
  return usersCollection.doc(id).set({
    id,
    displayName,
    photoURL,
  });
}

//주어진 파라미터를 고유Id로 가지고 있는 문서를 조회해 그 정보를 반환
export async function getUser(id) {
  const doc = await usersCollection.doc(id).get();
  return doc.data();
}
