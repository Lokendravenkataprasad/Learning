import React, { useEffect, useState } from 'react';
import { Product } from './types';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import { GetContext } from '../context/createContext';
import "./product-list.css"
import { Link } from 'react-router-dom';





const ProductList: React.FC = () => {
    const { setCartData, cartData } = GetContext();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data: Product[] = await response.json();
                const mapData: Product[] = data.map((product: Product) => {
                    return { ...product, count: 0 }
                })
                setCartData(mapData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        const filterCount: Product[] = cartData.filter((product) => product?.count > 0);
        if (filterCount.length == 0) {
            fetchProducts();
        }
    }, []);

    function handleProductAdd(index: number, isAdding: boolean) {
        if (isAdding) {
            let updatedCartData: Product[] = [...cartData];
            updatedCartData[index].count += 1;
            setCartData(updatedCartData);
        } else {
            let updatedCartData: Product[] = [...cartData];
            updatedCartData[index].count -= 1;
            setCartData(updatedCartData);
        }

    }


    return (
        <div>
            <div className='shopping-cart-header-container' >
                <h2>Products</h2>
                <Link to="/shopping-cart/cart"><Button >Cart</Button></Link>
            </div>
            <div className="product-list-container">
                {cartData.map((product, index) => (
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
                        {
                            product?.count > 0 ?
                                <div className='card-actions'>
                                    <CardActions>
                                        <Button
                                            size="small"
                                            color="primary"
                                            variant="contained"
                                            fullWidth
                                            onClick={() => handleProductAdd(index, false)}
                                            sx={{ height: "30px" }}
                                        >-</Button>
                                    </CardActions>
                                    <div>{product.count}</div>
                                    <CardActions>
                                        <Button
                                            size="small"
                                            color="primary"
                                            variant="contained"
                                            fullWidth
                                            onClick={() => handleProductAdd(index, true)}
                                            sx={{ height: "30px" }}
                                        >+</Button>
                                    </CardActions>
                                </div>
                                :
                                <CardActions>
                                    <Button
                                        size="small"
                                        color="primary"
                                        variant="contained"
                                        fullWidth
                                        onClick={() => handleProductAdd(index, true)}
                                    >
                                        Add to Cart
                                    </Button>
                                </CardActions>
                        }
                    </Card>
                ))
                }
            </div >
        </div >
    );
};

export default ProductList;
