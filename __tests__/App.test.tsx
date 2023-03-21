import { render } from '@testing-library/react-native';
import App from '../App';

describe('App component test', () => {
  it('Correctly render', async () => {
    const tree = render(<App />).toJSON();
    //@ts-ignore
    expect(tree.children.length).toBeGreaterThan(1);
  });
});