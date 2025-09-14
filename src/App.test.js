import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Little Lemon booking form', () => {
  render(<App />);
  const heading = screen.getByText(/reserve your table at little lemon/i);
  expect(heading).toBeInTheDocument();
});
