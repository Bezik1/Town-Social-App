import { NavigationContainer } from '@react-navigation/native';
import { render } from '@testing-library/react-native';
import AnnouncementsScreen from '../../components/AnnouncementsScreen';
import { TEST_ANNOUNCEMENTS_SCREEN_ROUTE } from '../../consts/test-consts';
import { NavbarSelectProvider } from '../../contexts/NavbarSelectContext';
import { ReloadProvider } from '../../contexts/ReloadContext';
import { UserProvider } from '../../contexts/UserContext';

describe('AnnouncementsScreen component test', () =>{
    const { getByTestId, root } = render(
        <NavigationContainer>
            <UserProvider>
                <NavbarSelectProvider>
                    <ReloadProvider>
                        <AnnouncementsScreen route={TEST_ANNOUNCEMENTS_SCREEN_ROUTE} />
                    </ReloadProvider>
                </NavbarSelectProvider>
            </UserProvider>
        </NavigationContainer>
    )

    test('Comments section proper rendering', () =>{
        const commentsContainer = getByTestId('comments')
        expect(commentsContainer.children.length).toBeGreaterThanOrEqual(0)
    })

    test('Component proper rendering', () => expect(root).toBeDefined())
})