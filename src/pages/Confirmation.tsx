import React from 'react';
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { Button } from '../components';

type RouteParams = {
  title: string;
  subtitle: string;
  buttonTitle: string;
  icon: 'smile' | 'hug';
  nextScreen: string;
};

const emojis = {
  hug: '🤗',
  smile: '😄'
};

export function Confirmation() {
  const navigation = useNavigation();
  const routes = useRoute();

  const {
    title,
    subtitle,
    buttonTitle,
    icon,
    nextScreen
  } = routes.params as RouteParams;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>{emojis[icon]}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        <View style={styles.footer}>
          <Button
            title={buttonTitle}
            onPress={() => navigation.navigate(nextScreen)}
          />
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
