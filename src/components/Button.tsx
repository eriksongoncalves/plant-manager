import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import colors from '../../styles/colors';

type ButtonProps = {
  title: string | React.ReactElement;
  onPress: () => void;
};

function Button({ title, onPress }: ButtonProps) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 10,
    minWidth: 56,
    height: 56
  },
  buttonText: {
    fontSize: 24,
    color: colors.white
  }
});

export default Button;
