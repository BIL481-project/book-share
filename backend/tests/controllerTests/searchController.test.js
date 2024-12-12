const { search } = require('../../controllers/searchController');
const SearchService = require('../../services/searchService');

jest.mock('../../services/searchService');

describe('SearchController Tests', () => {
    it('should return search results with valid input and option', async () => {
        const req = {
            body: {
                input: 'testInput',
                option: 'testOption',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const mockResult = [{ id: 1, name: 'Test Result' }];
        SearchService.search.mockResolvedValue(mockResult);

        await search(req, res);

        expect(SearchService.search).toHaveBeenCalledWith('testInput', 'testOption');
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockResult);
    });

    it('should return 400 if SearchService throws an error', async () => {
        const req = {
            body: {
                input: 'testInput',
                option: 'testOption',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const errorMessage = 'Search failed';
        SearchService.search.mockRejectedValue(new Error(errorMessage));

        await search(req, res);

        expect(SearchService.search).toHaveBeenCalledWith('testInput', 'testOption');
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
});
