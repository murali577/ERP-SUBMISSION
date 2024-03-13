import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductManagementComponent = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', price: 0, quantity: 0 });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axios.get('/api/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    };

    const handleInputChange = e => {
        const { name, value } = e.target;
        setNewProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        axios.post('/api/products', newProduct)
            .then(() => {
                fetchProducts();
                setNewProduct({ name: '', price: 0, quantity: 0 });
            })
            .catch(error => {
                console.error('Error saving product:', error);
            });
    };

    return (
        <div>
            <h1>Product Management</h1>
            <div>
                <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} placeholder="Product Name" />
                <input type="number" name="price" value={newProduct.price} onChange={handleInputChange} placeholder="Price" />
                <input type="number" name="quantity" value={newProduct.quantity} onChange={handleInputChange} placeholder="Quantity" />
                <button onClick={handleSubmit}>Add Product</button>
            </div>
            <ul>
                {products.map(product => (
                    <li key={product.id}>{product.name} - Price: {product.price} - Quantity: {product.quantity}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProductManagementComponent;
