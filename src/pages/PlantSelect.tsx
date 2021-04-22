import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
  const navigation = useNavigation();
  const [enviroments, setEnviroments] = useState<Enviroment[]>([]);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [filtedPlants, setFiltedPlants] = useState<Plant[]>([]);
  const [enviromentSelected, setEnviromentSelected] = useState('all');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchPlants = useCallback(async () => {
    const { data } = await api.get<Plant[]>(
      `plants?_sort=name&_order=asc&_page=${page}&_limit=8`
    );

    if (!data) {
      setLoading(true);
      return;
    }

    if (page > 1) {
      setPlants(prevValue => [...prevValue, ...data]);
      setFiltedPlants(prevValue => [...prevValue, ...data]);
    } else {
      setPlants(data);
      setFiltedPlants(data);
    }

    setLoading(false);
    setLoadingMore(false);
  }, [page]);

  const handleEnviromentSelected = useCallback(
    (enviroment: string) => {
      setEnviromentSelected(enviroment);

      if (enviroment === 'all') {
        return setFiltedPlants([...plants]);
      }

      const filtered = plants.filter(plant =>
        plant.environments.includes(enviroment)
      );

      setFiltedPlants(filtered);
    },
    [plants]
  );

  const handleFetchMore = useCallback((distance: number) => {
    if (distance < 1) {
      return;
    }

    setLoadingMore(true);
    setPage(prevValue => prevValue + 1);
    fetchPlants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlantSelect = useCallback(
    (plant: Plant) => {
      navigation.navigate('PlantSave', {
        plant
      });
    },
    [navigation]
  );

  useEffect(() => {
    async function fetchEnviroment() {
      const response = await api.get<Enviroment[]>(
        'plants_environments?_sort=title&_order=asc'
      );
      setEnviroments([
        {
          key: 'all',
          title: 'Todos'
        },
        ...response.data
      ]);
    }

    fetchEnviroment();
  }, []);

  useEffect(() => {
    fetchPlants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          onEndReachedThreshold={0.5}
          onEndReached={({ distanceFromEnd }) =>
            handleFetchMore(distanceFromEnd)
          }
          data={filtedPlants}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <PlantCardPrimary
                data={item}
                onPress={() => handlePlantSelect(item)}
              />
            );
          }}
          ListFooterComponent={
            loadingMore ? <ActivityIndicator color={colors.green} /> : <></>
          }
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
