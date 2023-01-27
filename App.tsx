import { View } from 'react-native';
import { NavbarSelectProvider } from './contexts/NavbarSelectContext';
import NavbarScreen from './components/NavbarScreen';
import { UserProvider } from './contexts/UserContext';
import { basicContainerStyles } from './styles';
import { ReloadProvider } from './contexts/ReloadContext';
import NavigationComponent from './components/NavigationComponent';

const App = () => (
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
)

export default App;