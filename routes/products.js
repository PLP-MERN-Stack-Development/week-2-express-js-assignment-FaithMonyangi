const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const logger = require('../middleware/logger');
const auth = require('../middleware/auth');
const validateProduct = require('../middleware/validateProduct');

// Middleware
router.use(logger);

// Temporary in-memory array
let products = [];

// GET all products
router.get('/', (req, res) => {
    res.json(products);
});

// GET a product by ID
router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
});

// POST a new product with middleware
router.post('/', auth, validateProduct, (req, res) => {
    const { name, description, price, category, inStock } = req.body;
    const newProduct = {
        id: uuidv4(),
        name,
        description,
        price,
        category,
        inStock
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// PUT update a product with middleware
router.put('/:id', auth, validateProduct, (req, res) => {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Product not found' });

    products[index] = { ...products[index], ...req.body };
    res.json(products[index]);
});

// DELETE a product
router.delete('/:id', auth, (req, res) => {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Product not found' });

    const deleted = products.splice(index, 1);
    res.json(deleted[0]);
});

module.exports = router;
