import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { View, Text,StyleSheet, ToastAndroid } from 'react-native';

const SelectOption = ({ unit, setUnit }) => {
    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT, ToastAndroid.CENTER);
      };
    return (
        <View style={styles.container}>
            <Text style={styles.label}>
            Change units
            </Text>
            <View style={styles.pickerContainer}>
            <Picker
                selectedValue={unit}
                onValueChange={(itemValue, itemIndex) => {
                    setUnit( u => itemValue)
                    showToast(`Unit changed to ${itemValue}`);
                }}
                style={styles.picker}
            >
                <Picker.Item label="°C" value='celsius' />
                <Picker.Item label="°F" value='fahrenheit' />
            </Picker>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  pickerContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
  },
  picker: {
    height: 40,
    width: 100,
  },
});

export default SelectOption;