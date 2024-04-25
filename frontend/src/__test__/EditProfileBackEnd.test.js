import { fetchDataTest, sendEditTest } from '../Pages/Editprofile'; // Adjust the path accordingly
import { useAuthContext } from '../Hooks/useAuthContext'; // If needed, ensure this import works in your test environment

// Mocking useAuthContext
jest.mock('../Hooks/useAuthContext', () => ({
  useAuthContext: jest.fn(() => ({ user: { email: 'mubtasim@gmail.com' } })),
}));

describe('fetchData and sendEdit function', () => {
    it('sends data to the API', async () => {
        const data = {
            age: 999,
            gender: 'testgender',
            country: 'testcountry',
            religion: 'testreligion'
        };
        const result = await sendEditTest('mubtasim@gmail.com', data);
        expect(result).toBe(true);
    });

    it('fetches data from the API', async () => {
        // Fetch data from the API
        const data = await fetchDataTest('mubtasim@gmail.com');
    
        // Assert that the fetched data contains the expected properties
        expect(data).toEqual({
            __v: 0,
            _id: "66103820b589c33bbca11330",
            age: 999,
            country: 'testcountry',
            email: 'mubtasim@gmail.com',
            gender: 'testgender',
            religion: 'testreligion'
        });
    });
    
});
