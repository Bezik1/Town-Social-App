import { render, fireEvent } from '@testing-library/react-native';
import CreateComment, { CreateCommentSubmit } from '../../components/CreateComment';
import { NavbarSelectProvider } from '../../contexts/NavbarSelectContext';
import { ReloadProvider } from '../../contexts/ReloadContext';
import { UserProvider } from '../../contexts/UserContext';

describe('CreateComment component tests:', () => {
    const { getByTestId, root } = render(
        <UserProvider>
            <NavbarSelectProvider>
                <ReloadProvider>
                    <CreateComment id='1' setVisibleComments={() =>{}}/>
                </ReloadProvider>
            </NavbarSelectProvider>
        </UserProvider>
    )

    test('Input text changing', () => {
        const input = getByTestId('createComment-text-input')
        fireEvent.changeText(input, 'test')

        expect(input.props.value).toBe('test')
    })

    test('Component proper rendering', () => expect(root).toBeDefined())

    test('Form submitting', () =>{
        const mockSubmit = jest.fn();
        const { getByTestId } = render(<CreateCommentSubmit onPress={mockSubmit} />)
        const submit = getByTestId("createComment-submit")
        fireEvent.press(submit)

        expect(mockSubmit).toHaveBeenCalled();
    })
})