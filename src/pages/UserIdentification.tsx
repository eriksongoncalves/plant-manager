import React, { useState, useCallback } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { Button } from '../components';

export function UserIdentification() {
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState('');

  const handleSubmit = useCallback(() => {
    navigation.navigate('Confirmation');
  }, [navigation]);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputChange = useCallback((value: string) => {
    setIsFilled(!!value);
    setName(value);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.form}>
            <View style={styles.header}>
              <Text style={styles.emoji}>😄</Text>
              <Text style={styles.title}>Como podemos{'\n'}chamar você?</Text>
            </View>

            <TextInput
              style={[
                styles.input,
                (isFocused || isFilled) && { borderColor: colors.green }
              ]}
              placeholder="Digite o nome"
              value={name}
              onChangeText={handleInputChange}
              onBlur={handleInputBlur}
              onFocus={handleInputFocus}
            />

            <View style={styles.footer}>
              <Button title="Confirmar" onPress={handleSubmit} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  content: {
    flex: 1,
    width: '100%'
  },
  form: {
    flex: 1,
    paddingHorizontal: 54,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    alignItems: 'center'
  },
  emoji: {
    fontSize: 44
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 32
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 40,
    padding: 10,
    textAlign: 'center'
  },
  footer: {
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 20
  }
});

export default UserIdentification;
