import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

export type Plant = {
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
  dateTimeNotification: Date;
  hour: string;
};

export type StoragePlantProps = {
  [id: string]: {
    data: Plant;
  };
};

export async function savePlant(plant: Plant): Promise<void> {
  try {
    const data = await AsyncStorage.getItem('@planmanager:plants');
    const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {};

    const newPlant = {
      [plant.id]: {
        data: plant
      }
    };

    await AsyncStorage.setItem(
      '@planmanager:plants',
      JSON.stringify({
        ...newPlant,
        ...oldPlants
      })
    );
  } catch (error) {
    throw new Error(error);
  }
}

export async function loadPlant() {
  try {
    const data = await AsyncStorage.getItem('@planmanager:plants');
    const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

    const plantsSorted = Object.keys(plants)
      .map(id => ({
        ...plants[id].data,
        hour: format(new Date(plants[id].data.dateTimeNotification), 'HH:mm')
      }))
      .sort((a: Plant, b: Plant) =>
        Math.floor(
          new Date(a.dateTimeNotification).getTime() / 1000 -
            Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)
        )
      );

    return plantsSorted;
  } catch (error) {
    throw new Error(error);
  }
}
