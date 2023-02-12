import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Snackbar as Bar } from 'react-native-paper';

export default function Snackbar({ text, show, ...props }) {
  return (
    <View style={styles.container}>
      <Bar
        action={{
          label: 'x',
        }}
        {...props}
      >
        {text}
      </Bar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
    flex: 1,
    justifyContent: 'space-between',
  },
});
