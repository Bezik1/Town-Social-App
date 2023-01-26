import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator}  from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import NavbarHeader from './components/NavbarHeader';
import { View } from 'react-native';
import { NavbarSelectProvider } from './contexts/NavbarSelectContext';
import NavbarScreen from './components/NavbarScreen';
import FormLogin from './components/FormLogin';
import { UserProvider } from './contexts/UserContext';
import RegisterForm from './components/RegisterForm';
import { basicContainerStyles } from './styles';
import AnnouncementsScreen from './components/AnnouncementsScreen';
import { Announcment } from './types';
import { FunctionComponent } from 'react';
import { ReloadProvider } from './contexts/ReloadContext';
import OptionsComponent from './components/OptionsComponent';

const App = () => {
  const Stack = createNativeStackNavigator()
  
  return (
    <UserProvider>
      <View style={basicContainerStyles}>
        <NavbarSelectProvider>
          <ReloadProvider>
            <NavbarScreen />
            <NavigationContainer>
              <Stack.Navigator screenOptions={{ header: NavbarHeader }}>
                <Stack.Screen
                  name='Login'
                  component={FormLogin}
                />
                <Stack.Screen
                  name='Register'
                  component={RegisterForm}
                />
                <Stack.Screen
                  name='Home'
                  component={HomeScreen}
                />
                <Stack.Screen 
                  name='AnnouncementsScreen'
                  component={AnnouncementsScreen as FunctionComponent<{}>}
                  initialParams={{ announcment: {} as Announcment }}
                />
                <Stack.Screen 
                  name='Options'
                  component={OptionsComponent}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </ReloadProvider>
        </NavbarSelectProvider>
      </View>
    </UserProvider>
  )
}

export default App;