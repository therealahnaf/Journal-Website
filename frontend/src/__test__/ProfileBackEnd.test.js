import { fetchDatatest } from '../Pages/Profile'; // Adjust the path accordingly
import { useAuthContext } from '../Hooks/useAuthContext'; // If needed, ensure this import works in your test environment

// Mocking useAuthContext
jest.mock('../Hooks/useAuthContext', () => ({
  useAuthContext: jest.fn(() => ({ user: { email: 'mubtasim@gmail.com' } })),
}));

describe('fetchData function', () => {
  it('fetches data from the API', async () => {
    const data = await fetchDatatest();
    expect(data).toBe(true);
  });
});
