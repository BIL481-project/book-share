SearchService = require('../services/searchService');

const search = async (req, res) => {
    try {
        const input = req.params.input;
        const result = await SearchService.search(input);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    search
};