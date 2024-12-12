SearchService = require('../services/searchService');

const search = async (req, res) => {
    try {
        const input = req.body.input;
        const option = req.body.option; 
        const result = await SearchService.search(input, option);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    search
};