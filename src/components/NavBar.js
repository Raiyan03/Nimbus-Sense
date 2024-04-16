// NavBar.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NavBar = ({ title }) => {
  return (
    <View style={styles.navBar}>
      <TouchableOpacity style={styles.iconButton}>
        <Ionicons name="menu" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.iconButton}>
        <Ionicons name="ellipsis-vertical" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    width: '100%', // Takes up the full width of its parent
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50, // Set the height of the nav bar
    paddingHorizontal: 10, // Add some padding on the sides // Set the background color similar to the image
    marginTop: 10, // Add some padding on the top
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  iconButton: {
    padding: 10, // Makes it easier to press the icons
  },
});

export default NavBar;
