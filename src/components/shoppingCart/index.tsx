// src/App.tsx
import React, { useState } from 'react';
import ProductList from './productList';
import { Product } from './types';

const ShoppingCart: React.FC = () => {

    return (
        <div>
            <ProductList />
        </div>
    );
};

export default ShoppingCart;
