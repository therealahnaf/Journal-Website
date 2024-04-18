import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Login from '../Pages/Login';
import { useLogin } from '../Hooks/useLogin';

jest.mock('../Hooks/useLogin');

describe('Login Component', () => {
  test('submits the form with the provided email and password', async () => {
    const mockLogin = jest.fn(); // Creating a mock function for useLogin.login
    useLogin.mockReturnValue({ login: mockLogin, error: null, isLoading: false });
    render(<Login />);
    const emailInput = screen.getByLabelText('Email Address:');
    const passwordInput = screen.getByLabelText('Password:');
    const loginButton = screen.getByText('Log in');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123'); // Using the mock function
    });
  });

  test('displays an error message when login fails', async () => {
    useLogin.mockReturnValue({ login: jest.fn(), error: 'Login failed', isLoading: false });
    render(<Login />);
    const loginButton = screen.getByText('Log in');
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('Login failed')).toBeInTheDocument(); // Ensuring toBeInTheDocument is available
    });
  });

  test('disables the button while loading', async () => {
    useLogin.mockReturnValue({ login: jest.fn(), error: null, isLoading: true });
    render(<Login />);
    const loginButton = screen.getByText('Log in');
    
    expect(loginButton.disabled).toBeTruthy();
  });
});
