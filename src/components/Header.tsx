import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

function Header() {
  const [name, setName] = useState('');

  useEffect(() => {
    async function getName() {
      const username = await AsyncStorage.getItem('@planmanager:user');
      setName(username || '');
    }

    getName();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>{name}</Text>
      </View>

      <Image
        style={styles.image}
        source={{
          uri: 'https://avatars.githubusercontent.com/u/13559274?v=4'
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: getStatusBarHeight() + 20
  },
  greeting: {
    fontSize: 32,
    fontFamily: fonts.text,
    color: colors.heading
  },
  userName: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 40
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40
  }
});

export default Header;
