import { fetchPostsTest, sendPostTest } from '../Pages/Community'; // Adjust the path accordingly
import { useAuthContext } from '../Hooks/useAuthContext'; // If needed, ensure this import works in your test environment

// Mocking useAuthContext
jest.mock('../Hooks/useAuthContext', () => ({
  useAuthContext: jest.fn(() => ({ user: { email: 'mubtasim@gmail.com' } })),
}));

describe('fetchData function', () => {
    it('fetches data from the API', async () => {
        const data = await sendPostTest('mubtasim@gmail.com','testing module','This is a module testing');
        expect(data).toBe(true);
      });
    it('fetches data from the API', async () => {
      const data = await fetchPostsTest();
      const lastpost = data[0]
      expect(lastpost).toEqual({
        __v: 0,
        _id: expect.any(String),
        email: 'mubtasim@gmail.com',
        title: 'testing module',
        content: 'This is a module testing',
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
    });
    });
});