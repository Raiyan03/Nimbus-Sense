import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

const headerHeight = Platform.OS === 'ios' ? 44 : 56;

const MainLayout = ({ children }) => {
    return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: headerHeight+50,
  },
});

export default MainLayout;