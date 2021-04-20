import React from 'react';
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { Button } from '../components';

export function Confirmation() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>😄</Text>
        <Text style={styles.title}>Prontinho</Text>
        <Text style={styles.subtitle}>
          Agora vamos começar a cuidar das suas plantinhas com muito cuidado
        </Text>

        <View style={styles.footer}>
          <Button title="Começar" onPress={() => {}} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 30
  },
  emoji: {
    fontSize: 78
  },
  title: {
    marginTop: 15,
    fontSize: 22,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 38
  },
  subtitle: {
    marginTop: 10,
    fontSize: 17,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.text,
    lineHeight: 38,
    paddingVertical: 20
  },
  footer: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 50
  }
});

export default Confirmation;
