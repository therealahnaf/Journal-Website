import { fetchMessagesTest, sendMessageTest } from '../Pages/Chat'; // Adjust the path accordingly
import { useAuthContext } from '../Hooks/useAuthContext'; // If needed, ensure this import works in your test environment

// Mocking useAuthContext
jest.mock('../Hooks/useAuthContext', () => ({
  useAuthContext: jest.fn(() => ({ user: { email: 'mubtasim@gmail.com' } })),
}));

describe('fetchData function', () => {
    it('fetches data from the API', async () => {
        const data = await sendMessageTest('mubtasim@gmail.com','test');
        expect(data).toBe(true);
      });
    it('fetches data from the API', async () => {
      const data = await fetchMessagesTest();
      const lastmessage = data[data.length -1]
      expect(lastmessage).toEqual({
        __v: 0,
        _id: expect.any(String),
        message: "test",
        email: 'mubtasim@gmail.com',
        timestamp: expect.any(String)
    });
});
});
  