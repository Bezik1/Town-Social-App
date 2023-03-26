import { NavigationContainer } from '@react-navigation/native';
import { render, fireEvent } from '@testing-library/react-native';
import FormLogin from '../../components/FormLogin';
import { NavbarSelectProvider } from '../../contexts/NavbarSelectContext';
import { ReloadProvider } from '../../contexts/ReloadContext';
import { UserProvider } from '../../contexts/UserContext';

describe('FormLogin component tests:', () => {
    const { getByTestId, root } = render(
        <NavigationContainer>
            <UserProvider>
                <NavbarSelectProvider>
                    <ReloadProvider>
                        <FormLogin />
                    </ReloadProvider>
                </NavbarSelectProvider>
            </UserProvider>
        </NavigationContainer>
    )

    test('Input text changing', () => {
        const loginTestIDs = ['login-email', 'login-pass']

        loginTestIDs.forEach((testID, i) =>{
            const input = getByTestId(testID)
            fireEvent.changeText(input, `test/${i}`)

            expect(input.props.value).toBe(`test/${i}`)
        })
    })

    test('Component proper rendering', () => expect(root).toBeDefined())
})