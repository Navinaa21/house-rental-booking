import * as React from 'react';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import { useEffect,useState } from 'react';
import axios from 'axios';

export default function Review({ formData, paymentFormData }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const houseId = queryParams.get('houseId');
  const [houseDetails, setHouseDetails] = useState({});
  const { firstName, lastName,address1 } = formData;
  const { cardNumber, Name, expirationDate } = paymentFormData;
  const addresses = address1;
  const payments = [
    { name: 'Card type:', detail: 'Visa' },
    { name: 'Card holder:', detail: Name },
    { name: 'Card number:', detail: cardNumber },
    { name: 'Expiry date:', detail: expirationDate },
  ];
  useEffect(() => {
    console.log(`Fetching details for houseId: houseId=${houseId}`);
    axios.get(`https://house-rental-booking.onrender.com/api/checkout?houseId=${houseId}`)  //api/checkout/getCheckout
      .then(response => {
        console.log('Fetched house details:', response.data);
        setHouseDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching house details:', error);
      });
  }, [houseId]);

  return (
    <Stack spacing={2}>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary={houseDetails.title}  />
          <Typography variant="body2">{houseDetails.advance}</Typography>
        </ListItem>
        
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {houseDetails.advance}
          </Typography>
        </ListItem>
      </List>
      <Divider />
      <Stack
        direction="column"
        divider={<Divider flexItem />}
        spacing={2}
        sx={{ my: 2 }}
      >
        <div>
          
          <Typography gutterBottom>{firstName} {lastName}</Typography>
          <Typography color="text.secondary" gutterBottom>
            {addresses}
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Stack
                  direction="row"
                  spacing={1}
                  useFlexGap
                  sx={{ width: '100%', mb: 1 }}
                >
                  <Typography variant="body1" color="text.secondary">
                    {payment.name}
                  </Typography>
                  <Typography variant="body2">{payment.detail}</Typography>
                </Stack>
              </React.Fragment>
            ))}
          </Grid>
        </div>
      </Stack>
    </Stack>
  );
}
