import React from 'react';
import { render } from '@testing-library/react';
import About from '../Pages/About';

describe('About Component', () => {
  test('renders About component with all sections', () => {
    const { getByText } = render(<About />);

    // Check if all section titles are rendered
    expect(getByText('About Us')).toBeInTheDocument();
    expect(getByText('Our Mission')).toBeInTheDocument();
    expect(getByText('Why Journal Online?')).toBeInTheDocument();
    expect(getByText('AI Integration for Emotional Support')).toBeInTheDocument();
    expect(getByText('Community Blog and Chat')).toBeInTheDocument();
    expect(getByText('Connect, Reflect, Inspire')).toBeInTheDocument();

    // You can add more specific tests here if needed
  });
});
