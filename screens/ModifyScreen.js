import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import IconRightButton from '../components/IconRightButton';
import {updatePost} from '../lib/posts';

const ModifyScreen = () => {
  const navigation = useNavigation();
  const {params} = useRoute();
  //라우트 파라미터의 description을 초깃값으로 사용
  const [description, setDescription] = useState(params.description);

  const onSubmit = useCallback(async () => {
    await updatePost({id: params.id, description});
    navigation.pop();
  }, [navigation, params.id, description]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <IconRightButton onPress={onSubmit} name="check" />,
    });
  }, [navigation, onSubmit]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ios: 'height'})}
      style={styles.block}
      keyboardVerticalOffset={Platform.select({ios: 88})}>
      <TextInput
        style={styles.input}
        multiline
        placeholder="이 사진에 대한 설명을 입력하세요..."
        textAlignVertical="top"
        value={description}
        onChangeText={setDescription}
      />
    </KeyboardAvoidingView>
  );
};

export default ModifyScreen;

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  input: {
    padding: 16,
    flex: 1,
    fontSize: 16,
  },
});
