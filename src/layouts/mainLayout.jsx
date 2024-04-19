import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const headerHeight = Platform.OS === 'ios' ? 44 : 56;

const MainLayout = ({ children }) => {
    return (
        <LinearGradient
          colors={['#FDDE71', '#FCE697', '#FAF6E5']} // Your gradient colors
          style={styles.container}
        >
            {children}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: headerHeight + 50,
    // backgroundColor is not needed here because the gradient is used
  },
});

export default MainLayout;
