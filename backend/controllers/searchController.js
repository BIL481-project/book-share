SearchService = require('../services/searchService');

const search = async (req, res) => {
    try {
        const { option, input } = req.query;
        const result = await SearchService.search(input, option);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    search
};