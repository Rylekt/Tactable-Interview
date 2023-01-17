jest.mock('isomorphic-fetch', () => {
    return jest.fn(() => Promise.resolve({ json: () => Promise.resolve(mockData) }));
});

const mockData = [{ id: 1, title: "Test Todo" }];

describe('TodoClient', () => {
    it('should fetch data', async () => {
        const client = new TodoClient();
        const data = await client.getTodos();
        expect(data).toEqual(mockData);
    });
});