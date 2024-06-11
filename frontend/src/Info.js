import * as React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useEffect,useState } from 'react';
import axios from 'axios';


function Info({ totalPrice }) {
  const [houseDetails, setHouseDetails] = useState({});
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const houseId = queryParams.get('houseId');
  const products = [
    {
      name: `${houseDetails.title}`,
      desc: 'Advance Payment Price',
    },
    
    
  ];
  useEffect(() => {
    console.log(`Fetching details for houseId: houseId=${houseId}`);
    axios.get(`http://localhost:8081/api/checkout?houseId=${houseId}`)
      .then(response => {
        console.log('Fetched house details:', response.data);
        setHouseDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching house details:', error);
      });
  }, [houseId]);



  return (
    <React.Fragment>
      <Typography variant="subtitle2" color="text.secondary">
        Total
      </Typography>
      <Typography variant="h4" gutterBottom>
        {totalPrice}
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText
              sx={{ mr: 2 }}
              primary={product.name}
              secondary={product.desc}
            />
            {/* <Typography variant="body1" fontWeight="medium">
              {product.price}
            </Typography> */}
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}

Info.propTypes = {
  totalPrice: PropTypes.string.isRequired,
};

export default Info;
