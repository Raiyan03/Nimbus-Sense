import React, { useRef, useState, useEffect } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity, Text, Alert, FlatList, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SuggestionCard from './suggestion-card';
import MainLayout from '../../layouts/mainLayout';
import { getCity, getGeoCode } from '../../lib/actions';
import { insertLocation } from '../../lib/db';

const SearchBar = ({ Locations, setLocations}) => {
  const inputRef = useRef(null);
  const navigation = useNavigation(); // Get navigation object
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  const handleChange = async (text) => {
    console.log('Search text:', text.length);
    setSearchText(s => text);
    if (text.length > 2) {
      const data = await getGeoCode(text);
      setSuggestions(s => data);
    } else {
      setSuggestions([]);
    }
  }

  const handleSuggestionPress = (suggestion) => {
    console.log('Suggestion pressed:', suggestion);
    setSearchText(s => suggestion.name);
    if (suggestion) {
      const { name, lat, lon } = suggestion;
      const added = insertLocation(name, lat, lon);
      if (added) {
        const id = Locations.length + 1;
        setLocations([...Locations, { id, name, latitude: lat, longitude: lon }]);
        showToast(`${ name } added to locations!`);
        navigation.goBack();
      }
    }
  };

  return (
    <MainLayout>
      <View style={styles.container}>
        <TextInput
          ref={inputRef}
          placeholder="Search..."
          style={styles.searchBar}
          autoFocus={true}
          onChangeText={handleChange}
        />
        <FlatList
          data={suggestions}
          renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSuggestionPress(item)}>
            <SuggestionCard
              city={item.name}
              state={item.state}
              country={item.country}
            />
          </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 10,
    height: '100%',
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  suggestionsList: {
    maxHeight: 200,
    borderRadius: 10,
  },
});

export default SearchBar;