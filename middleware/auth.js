module.exports = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey !== 'your_api_key_here') {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};
