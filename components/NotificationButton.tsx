import * as Notifications from 'expo-notifications';
import { useEffect, useState } from "react"
import { Button } from "react-native-elements"

const NotificationButton = () =>{
    const [expoPushToken, setExpoPushToken] = useState('');
    
    useEffect(() =>{
        registerForPushNotificationsAsync()
    }, [])

    const registerForPushNotificationsAsync = async () => {
        const { status } = await Notifications.getPermissionsAsync();
    
        if (status !== 'granted') console.log('Nie uzyskano uprawnień do powiadomień.')
        else console.log('Uzyskano uprawnienia do powiadomień')
    
        const token = (await Notifications.getExpoPushTokenAsync()).data
        setExpoPushToken(token);
      };
    
      const sendNotification = async () => {
        const message = {
          to: expoPushToken,
          sound: 'default',
          title: 'Powiadomienie wysłane z aplikacji',
          body: 'To jest przykładowe powiadomienie wysłane z aplikacji.',
          data: { data: 'goes here' },
        };
    
        await fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        });
    
      };

    return <Button onPress={sendNotification} />
}

export default NotificationButton