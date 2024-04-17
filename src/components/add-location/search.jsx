import React, { useRef, useEffect } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MainLayout from '../../layouts/mainLayout';

const SearchBar = () => {
  const inputRef = useRef(null);
  const navigation = useNavigation(); // Get navigation object

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleAddPress = () => {
    // Handle add button press here
    console.log('Add button pressed');
    Alert.alert(
      'New location added!',
      '',
      [
        { text: 'OK', onPress: () => navigation.goBack() } 
      ]
    );
  };

  return (
    <MainLayout>
      <View style={styles.container}>
        <TextInput
          ref={inputRef}
          placeholder="Search..."
          style={styles.searchBar}
          autoFocus={true}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: '100%',
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    flex: 1,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SearchBar;
