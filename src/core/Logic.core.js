import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => {
      return {
        shouldShowAlert: true,
      };
    },
  });

export const LogicCore = () => {
    //const [pushToken, setPushToken] = useState();

    useEffect(() => {
        Notifications.getPermissionsAsync()
          .then((statusObj) => {
            if (statusObj.status !== 'granted') {
              return Notifications.requestPermissionsAsync();
            }
            return statusObj;
          })
          .then((statusObj) => {
            if (statusObj.status !== 'granted') {
              throw new Error('Permission not granted!');
            }
          })
          .then(() => {
            return Notifications.getExpoPushTokenAsync();
          })
          .then((response) => {
            const token = response.data;
            console.log('Token: ', token)
            //setPushToken(token);
          })
          .catch((err) => {
            console.log(err);
            return null;
          });
      }, []);

    return (
        <View />
    );
}