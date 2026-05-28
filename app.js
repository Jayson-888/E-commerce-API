const express = require ('express');
const app = express();
const fs = require('fs');

const products = JSON.parse(fs.readFileSync('./database/ecomm.JSON','utf8'));


app.listen(8000, () => {
    console.log('Server is running on port 8000');
});

app.get('/api/v1/products', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: products.length,
        data: {
            products
        }
    });
});

app.get('/api/v1/products/:id', (req, res) => {
    const id = req.params.id * 1;
    const product = products.find(el => el.id === id);

    if (!product) {
        return res.status(404).json({
            status: 'fail',
            message: 'Product not found'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            product
        }
    });
});