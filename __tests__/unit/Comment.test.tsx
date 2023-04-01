import { render, fireEvent } from '@testing-library/react-native';
import { ReloadProvider } from '../../contexts/ReloadContext';
import { UserProvider } from '../../contexts/UserContext';
import CommentComponent from '../../components/Comment';
import { TEST_COMMENT } from '../../consts/test-consts';

describe('FormLogin component tests:', () => {
    const { root } = render(
            <UserProvider>
                <ReloadProvider>
                    <CommentComponent
                        comment={TEST_COMMENT}
                        index={1}
                        setVisibleComments={() =>{}}
                        id={'test_id'}
                    />
                </ReloadProvider>
            </UserProvider>
    )

    test('Component proper rendering', () => expect(root).toBeDefined())
})