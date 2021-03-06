import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

type ButtonProps = {
  title: string | React.ReactElement;
  onPress: () => void;
} & TouchableOpacityProps;

function Button({ title, onPress, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.7}
      {...rest}
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
    minWidth: 56,
    height: 56
  },
  buttonText: {
    fontSize: 16,
    fontFamily: fonts.heading,
    color: colors.white
  }
});

export default Button;
