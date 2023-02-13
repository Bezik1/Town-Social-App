import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator}  from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import NavbarHeader from './NavbarHeader';
import FormLogin from './FormLogin';
import RegisterForm from './RegisterForm';
import { API_URLS } from '../consts';
import * as Device from 'expo-device';
import AnnouncementsScreen from './AnnouncementsScreen';
import { Announcment, Data, User } from '../types';
import { FunctionComponent, useEffect } from 'react';
import OptionsComponent from './OptionsComponent';
import axios from 'axios';
import { useUserContext } from '../contexts/UserContext';
import Map from './Map';

const NavigationComponent = () =>{
    const Stack = createNativeStackNavigator()
    const { user, setUser } = useUserContext()
    
    useEffect(() =>{
        const asyncIfLogined = async () =>{
            const { data, status }: Data<User> = (await axios.post(API_URLS.IfLoggined, { device: Device.osInternalBuildId })).data
            if(status === 'succes' && data) {
                setUser(data)
            }
        }
        asyncIfLogined()
    }, [])

    return (
        <NavigationContainer>
            <Stack.Navigator 
              screenOptions={{ header: NavbarHeader }}
            >
                <Stack.Screen
                  name='Ogłoszenia'
                  component={user ? HomeScreen : FormLogin}
                />
                <Stack.Screen
                  name='Mapa'
                  component={Map}
                />
                <Stack.Screen
                  name='Zaloguj'
                  component={FormLogin}
                />
                <Stack.Screen
                  name='Zarejestruj'
                  component={RegisterForm}
                />
                <Stack.Screen 
                  name='AnnouncementsScreen'
                  component={AnnouncementsScreen as FunctionComponent<{}>}
                  initialParams={{ announcment: {} as Announcment }}
                />
                <Stack.Screen 
                  name='Opcje'
                  component={OptionsComponent}
                />
              </Stack.Navigator>
            </NavigationContainer>
    )
}

export default NavigationComponent