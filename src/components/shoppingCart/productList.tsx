import React, { useEffect, useState } from 'react';
import { Product } from './types';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';


const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data: Product[] = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h2>Products</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", justifyContent: "space-between", background: "#F1F1F2", padding: '20px' }}>
                {products.map(product => (
                    <Card key={product.id} style={{
                        width: 270,
                    }}>
                        <CardActionArea>
                            <CardMedia
                                style={{
                                    height: 200,
                                    width: 200,
                                    margin: "auto"
                                }}
                                image={product.image}
                                title={product.title}
                            />
                            <CardContent style={{ height: "110px" }}>
                                <Typography gutterBottom component="div">
                                    {product.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    ${product.price.toFixed(2)}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button
                                size="small"
                                color="primary"
                                variant="contained"
                                fullWidth
                            >
                                Add to Cart
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
