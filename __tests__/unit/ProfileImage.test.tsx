import { render } from '@testing-library/react-native';
import ProfileImage from '../../components/ProfileImage';

describe('ProfileImage component tests:', () => {
    const { root } = render(<ProfileImage style={{}} loading={false} data={undefined} />)

    test('Image props proper transmit', () => expect(root.props.source).toBeDefined())

    test('Component proper rendering', () => expect(root).toBeDefined())
})