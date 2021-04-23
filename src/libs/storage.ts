import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import * as Notification from 'expo-notifications';

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
    notificationId: string;
  };
};

export async function savePlant(plant: Plant): Promise<void> {
  try {
    const nexTime = new Date(plant.dateTimeNotification);
    const now = new Date();
    const { times, repeat_every } = plant.frequency;

    if (repeat_every === 'week') {
      const interval = Math.trunc(7 / times);
      nexTime.setDate(now.getDate() * interval);
    } else {
      nexTime.setDate(nexTime.getDate() + 1);
    }

    const seconds = Math.abs(
      Math.ceil(now.getTime() - nexTime.getTime()) / 1000
    );

    const notificationId = await Notification.scheduleNotificationAsync({
      content: {
        title: 'Heeey, 🌱',
        body: `Está na hora de cuidar da sua ${plant.name}`,
        sound: true,
        priority: Notification.AndroidNotificationPriority.HIGH,
        data: {
          plant
        }
      },
      trigger: {
        seconds: seconds < 60 ? 60 : seconds,
        repeats: true
      }
    });

    const data = await AsyncStorage.getItem('@planmanager:plants');
    const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {};

    const newPlant = {
      [plant.id]: {
        data: plant,
        notificationId
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

export async function removePlant(id: string) {
  const data = await AsyncStorage.getItem('@planmanager:plants');
  const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

  await Notification.cancelScheduledNotificationAsync(
    plants[id].notificationId
  );

  delete plants[id];

  await AsyncStorage.setItem('@planmanager:plants', JSON.stringify(plants));
}
