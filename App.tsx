import { View } from 'react-native';
import { NavbarSelectProvider } from './contexts/NavbarSelectContext';
import NavbarScreen from './components/NavbarScreen';
import { UserProvider } from './contexts/UserContext';
import { basicContainerStyles } from './styles';
import { ReloadProvider } from './contexts/ReloadContext';
import NavigationComponent from './components/NavigationComponent';
import { Suspense } from 'react';

const App = () => (
  <Suspense>
    <UserProvider>
      <View style={basicContainerStyles}>
        <NavbarSelectProvider>
          <ReloadProvider>
            <NavbarScreen />
              <NavigationComponent />
          </ReloadProvider>
        </NavbarSelectProvider>
      </View>
    </UserProvider>
  </Suspense>
)

export default App;