import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Signup from '../Pages/Signup';
import { useSignup } from '../Hooks/useSignup';

jest.mock('../Hooks/useSignup');

describe('Signup Component', () => {
  test('submits the form with the provided email and password', async () => {
    const mockSignup = jest.fn(); // Creating a mock function for useSignup.signup
    useSignup.mockReturnValue({ signup: mockSignup, error: null, isLoading: false });
    render(<Signup />);
    const emailInput = screen.getByLabelText('Email Address:');
    const passwordInput = screen.getByLabelText('Password:');
    const signupButton = screen.getByText('Sign up');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(signupButton);

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith('test@example.com', 'password123'); // Using the mock function
    });
  });

  test('displays an error message when signup fails', async () => {
    useSignup.mockReturnValue({ signup: jest.fn(), error: 'Signup failed', isLoading: false });
    render(<Signup />);
    const signupButton = screen.getByText('Sign up');
    fireEvent.click(signupButton);

    await waitFor(() => {
      expect(screen.getByText('Signup failed')).toBeInTheDocument(); // Ensuring toBeInTheDocument is available
    });
  });

  test('disables the button while loading', async () => {
    useSignup.mockReturnValue({ signup: jest.fn(), error: null, isLoading: true });
    render(<Signup />);
    const signupButton = screen.getByText('Sign up');
    
    expect(signupButton.disabled).toBeTruthy();
  });
});
