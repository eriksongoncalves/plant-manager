import React from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  View
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { Button } from '../components';
import wateringImg from '../assets/watering.png';

export function Welcome() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie {'\n'}
          suas plantas de {'\n'}
          forma fácil
        </Text>
        <Image source={wateringImg} style={styles.image} resizeMode="contain" />
        <Text style={styles.subtitle}>
          Não esqueça de regar suas plantas. Nós cuidamos de lembrar sempre que
          precisar.
        </Text>
        <Button
          title={<Feather name="chevron-right" style={styles.buttonIcon} />}
          onPress={() => navigation.navigate('UserIdentification')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: fonts.heading,
    color: colors.heading,
    marginTop: 38,
    lineHeight: 34
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 20,
    lineHeight: 28,
    textAlign: 'center',
    paddingHorizontal: 20,
    color: colors.heading
  },
  image: {
    height: Dimensions.get('window').width * 0.7
  },
  buttonIcon: {
    fontSize: 32,
    color: colors.white
  }
});

export default Welcome;
