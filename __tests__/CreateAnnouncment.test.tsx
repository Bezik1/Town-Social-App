import { render, fireEvent } from '@testing-library/react-native';
import CreateAnnouncment, { CreateAnnouncmentSubmit } from '../components/CreateAnnouncment';
import { NavbarSelectProvider } from '../contexts/NavbarSelectContext';
import { UserProvider } from '../contexts/UserContext';

describe('CreateAnnouncment component tests', () => {
    it('Input text changing', () => {
        const { getByTestId } = render(
            <UserProvider>
                <NavbarSelectProvider>
                    <CreateAnnouncment setReload={() =>{}} />
                </NavbarSelectProvider>
            </UserProvider>
        )

        const input = getByTestId('anouncment-text-input')
        fireEvent.changeText(input, 'test')

        expect(input.props.value).toBe('test')
    })

    it('Form submitting', () =>{
        const mockSubmit = jest.fn();
        const { getByTestId } = render(<CreateAnnouncmentSubmit onPress={mockSubmit} />)
        const submit = getByTestId("anouncment-submit")
        fireEvent.press(submit)

        expect(mockSubmit).toHaveBeenCalled();
    })
})