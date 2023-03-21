import { render, fireEvent } from '@testing-library/react-native';
import CreateAnnouncment, { CreateAnnouncmentSubmit } from '../components/CreateAnnouncment';
import { NavbarSelectProvider } from '../contexts/NavbarSelectContext';
import { UserProvider } from '../contexts/UserContext';

describe('CreateAnnouncment component tests', () => {
    const { getByTestId } = render(
        <UserProvider>
            <NavbarSelectProvider>
                <CreateAnnouncment setReload={() =>{}} />
            </NavbarSelectProvider>
        </UserProvider>
    )
    
    test('Input text changing', () => {
        const input = getByTestId('anouncment-text-input')
        fireEvent.changeText(input, 'test')

        expect(input.props.value).toBe('test')
    })

    test('Form submitting', () =>{
        const mockSubmit = jest.fn();
        const { getByTestId } = render(<CreateAnnouncmentSubmit onPress={mockSubmit} />)
        const submit = getByTestId("anouncment-submit")
        fireEvent.press(submit)

        expect(mockSubmit).toHaveBeenCalled();
    })
})