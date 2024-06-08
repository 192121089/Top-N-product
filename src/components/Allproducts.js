import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Select, MenuItem, TextField, Button } from '@mui/material';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({
    company: '',
    category: '',
    minPrice: 0,
    maxPrice: 10000,
    rating: 0,
    availability: '',
  });

  const fetchProducts = async () => {
    if (filter.company && filter.category) {
      try {
        const { data } = await axios.get(`http://20.244.56.144/test/companies/${filter.company}/categories/${filter.category}?top=10&minPrice=${filter.minPrice}&maxPrice=${filter.maxPrice}`);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filter]);

  return (
    <Box>
      <Box display="flex" gap={2} mb={2}>
        <Select value={filter.company} onChange={(e) => setFilter({ ...filter, company: e.target.value })}>
          <MenuItem value=''>Select Company</MenuItem>
          <MenuItem value='AMZ'>AMZ</MenuItem>
          <MenuItem value='FLP'>FLP</MenuItem>
          <MenuItem value='SNP'>SNP</MenuItem>
          <MenuItem value='MYN'>MYN</MenuItem>
          <MenuItem value='AZO'>AZO</MenuItem>
        </Select>
        <Select value={filter.category} onChange={(e) => setFilter({ ...filter, category: e.target.value })}>
          <MenuItem value=''>Select Category</MenuItem>
          <MenuItem value='Phone'>Phone</MenuItem>
          <MenuItem value='Computer'>Computer</MenuItem>
          <MenuItem value='TV'>TV</MenuItem>
          <MenuItem value='Earphone'>Earphone</MenuItem>
          <MenuItem value='Tablet'>Tablet</MenuItem>
          {/* Add other categories here */}
        </Select>
        <TextField
          type='number'
          value={filter.minPrice}
          onChange={(e) => setFilter({ ...filter, minPrice: e.target.value })}
          placeholder='Min Price'
        />
        <TextField
          type='number'
          value={filter.maxPrice}
          onChange={(e) => setFilter({ ...filter, maxPrice: e.target.value })}
          placeholder='Max Price'
        />
        <Button onClick={fetchProducts}>Filter</Button>
      </Box>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {products.map((product) => (
          <Card key={product.productName} style={{ width: '200px' }}>
            <CardContent>
              <Typography variant="h6">{product.productName}</Typography>
              <Typography>Price: ${product.price}</Typography>
              <Typography>Rating: {product.rating}</Typography>
              <Typography>Discount: {product.discount}%</Typography>
              <Typography>Availability: {product.availability}</Typography>
              <Link to={`/product/${encodeURIComponent(product.productName)}`}>View Details</Link>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default AllProducts;
