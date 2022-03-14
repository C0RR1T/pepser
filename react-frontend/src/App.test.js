import { render, screen } from '@testing-library/react';
import App from './App';

test('contains the add pony button', () => {
  render(<App />);
  const linkElement = screen.getByText(/Add Pony/i);
  expect(linkElement).toBeInTheDocument();
});
