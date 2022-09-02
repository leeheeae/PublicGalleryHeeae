import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ActionSheetModal = ({visible, onClose, actions}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}>
      <Pressable style={styles.background} onPress={onClose}>
        <View style={styles.whitebox}>
          {actions.map(action => (
            <Pressable
              style={styles.actionButton}
              android_ripple={{color: '#eee'}}
              onPress={() => {
                action.onPress();
                onClose();
              }}
              key={action.text} //배열을 랜더링할 때는 키 값을 꼭 넣어줘야함
            >
              <Icon
                name={action.icon}
                color="#757575"
                size={24}
                style={styles.icon}
              />
              <Text style={styles.actionText}>{action.text}</Text>
            </Pressable>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
};

export default ActionSheetModal;

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whitebox: {
    width: 300,
    backgroundColor: '#FFF',
    borderRadius: 4,
    elevation: 2,
  },
  actionButton: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
  },
});
