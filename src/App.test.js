import React from 'react';
import { render, screen } from '@testing-library/react'; // Make sure these imports are here
import App from './App';

test('renders Smart Reviewer heading', () => {
  render(<App />);
  const headingElements = screen.getAllByText(/Smart Reviewer/i);
  expect(headingElements.length).toBeGreaterThan(0);  // Ensure that there are matches
});
