import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Card, CardContent } from '@mui/material';

const ProductDetail = () => {
  const { productName } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  const fetchProductDetail = async () => {
    try {
      // Replace with the correct API endpoint for fetching a single product detail
      const response = await axios.get(`http://20.244.56.144/test/products/${productName}`);
      setProduct(response.data);
    } catch (error) {
      setError('Error fetching product details');
    }
  };

  useEffect(() => {
    fetchProductDetail();
  }, [productName]);

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  if (!product) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4">Product Detail for {product.productName}</Typography>
      <Card>
        <CardContent>
          <Typography variant="h6">Name: {product.productName}</Typography>
          <Typography>Company: {product.company}</Typography>
          <Typography>Category: {product.category}</Typography>
          <Typography>Price: ${product.price}</Typography>
          <Typography>Rating: {product.rating}</Typography>
          <Typography>Discount: {product.discount}%</Typography>
          <Typography>Availability: {product.availability}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductDetail;
