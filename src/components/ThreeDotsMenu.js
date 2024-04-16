import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ThreeDotsMenu = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons name="ellipsis-vertical" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default ThreeDotsMenu;
