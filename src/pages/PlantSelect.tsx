import React, { useState, useEffect, useCallback } from 'react';
import { Text, StyleSheet, View, FlatList } from 'react-native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import Header from '../components/Header';
import EnviromentButton from '../components/EnviromentButton';
import PlantCardPrimary from '../components/PlantCardPrimary';
import Loading from '../components/Loading';
import api from '../services/api';

type Enviroment = {
  key: string;
  title: string;
};

type Plant = {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: string[];
  frequency: {
    times: number;
    repeat_every: string;
  };
};

export function PlantSelect() {
  const [enviroments, setEnviroments] = useState<Enviroment[]>([]);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [filtedPlants, setFiltedPlants] = useState<Plant[]>([]);
  const [enviromentSelected, setEnviromentSelected] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEnviroment() {
      const response = await api.get<Enviroment[]>(
        'plants_environments?_sort=title&_order=asc'
      );
      setEnviroments([
        {
          key: 'todos',
          title: 'Todos'
        },
        ...response.data
      ]);
    }

    fetchEnviroment();
  }, []);

  useEffect(() => {
    async function fetchPlants() {
      const response = await api.get<Plant[]>('plants?_sort=name&_order=asc');
      setPlants(response.data);
      setFiltedPlants(response.data);
      setLoading(false);
    }

    fetchPlants();
  }, []);

  const handleEnviromentSelected = useCallback(
    (enviroment: string) => {
      setEnviromentSelected(enviroment);

      if (enviroment === 'all') {
        return setFiltedPlants(plants);
      }

      const filtered = plants.filter(plant =>
        plant.environments.includes(enviroment)
      );

      setFiltedPlants(filtered);
    },
    [plants]
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Header />
        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
      </View>

      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.enviromentList}
          data={enviroments}
          keyExtractor={item => item.key}
          renderItem={({ item }) => {
            return (
              <EnviromentButton
                title={item.title}
                active={item.key === enviromentSelected}
                onPress={() => handleEnviromentSelected(item.key)}
              />
            );
          }}
        />
      </View>

      <View style={styles.plants}>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={filtedPlants}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return <PlantCardPrimary data={item} />;
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    paddingHorizontal: 30
  },
  title: {
    fontSize: 17,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 20,
    marginTop: 15
  },
  subtitle: {
    fontSize: 17,
    fontFamily: fonts.text,
    color: colors.heading,
    lineHeight: 20
  },
  enviromentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32
  },
  plants: { flex: 1, paddingHorizontal: 20 }
});

export default PlantSelect;
