import React, { useState } from "react";
import { Button, Form, Input, Header, Segment } from "semantic-ui-react";
import api from "../utils/axiosInstance.ts";
import { ApiResponse } from "../types/GenericTypes.ts";
import { Link } from 'react-router-dom';
import { OrderAddCommand } from "../types/OrderTypes";
//import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
//import { LocalJwt } from "../types/AuthTypes.ts";
import { useNavigate } from "react-router-dom";

// const VITE_SIGNALR_URL = import.meta.env.VITE_SIGNALR_URL;

const OrderAddPage = () => {
  const saleOptions = [
    { key: 'a', text: 'All', value: '0' },
    { key: 'od', text: 'OnDiscount', value: '1' },
    { key: 'nd', text: 'NonDiscount', value: '2' }
  ];
  const navigate = useNavigate();

  // const [orderHubConnection,setOrderHubConnection] =useState<HubConnection | undefined>(undefined);

  // useEffect(()=>{
  //   const startConnection = async () => {

  //     const jwtJson = localStorage.getItem("localUser");
      
  //     if(jwtJson){
  //       const localJwt:LocalJwt =JSON.parse(jwtJson);

  //       console.log(localJwt.accessToken);
      
  //       const connection = new HubConnectionBuilder()
  //       .withUrl(`${VITE_SIGNALR_URL}/Hubs/OrderHub?access_token=${localJwt.accessToken}`)
  //       .withAutomaticReconnect()
  //       .build();

  //       await connection.start();

  //       setOrderHubConnection(connection);
  //     }
  //   }

  //   if(!orderHubConnection){
  //     startConnection();
  //   }

  // },[])

  const [order, setOrder] = useState<OrderAddCommand>({
    requestedAmount: 0,
    productCrawlType: 0,
    email: "ays.ayd@gmail.com",
    name: "ays",
  });

  const [formErrors, setFormErrors] = useState({
    requestedAmount: false,
    productCrawlType: false
  });

  const handleSubmit = async () => {

    // const orderId = await orderHubConnection?.invoke<string>("AddNewOrder", order)
    //   .then((result) => {
    //     console.log('AddNewOrder metodundan dönen sonuç:', result);
    //   })
    //   .catch((error) => {
    //     console.error('AddNewOrder metodunda hata oluştu:', error);
    //   });

    if (validateForm()) {
      const response = await api.post<ApiResponse<string>>("/Orders", order);
      navigate('/crawlerLive');
      if (response.data) {
        console.log(`Order with ID: ${response.data.data} added successfully.`);
        
      }
      
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value
    });
  }

  const handleSelectChange = (_: React.SyntheticEvent<HTMLElement, Event>, data: any) => {
    setOrder({
      ...order,
      productCrawlType: data.value
    });
  }

  const validateForm = () => {
    const errors = {
      requestedAmount: false,
      productCrawlType: false
    };

    let isValid = true;

    if (!order.requestedAmount || order.requestedAmount <= 0) {
      errors.requestedAmount = true;
      isValid = false;
    }

    if (order.productCrawlType === 0) {
      errors.productCrawlType = true;
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  }

  

  return (
    <div>
      <Segment padded='very'>
        <Header as='h1' textAlign='center' className="main-header">Add Order</Header>
        <Form onSubmit={handleSubmit}>
          <Form.Field error={formErrors.requestedAmount}>
            <label>Requested Amount</label>
            <Input
              type="number"
              placeholder='Requested Amount'
              name="requestedAmount"
              value={order.requestedAmount.toString()}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Select
            placeholder="Product Crawl Type"
            options={saleOptions}
            name="productCrawlType"
            value={order.productCrawlType}
            onChange={handleSelectChange}
            error={formErrors.productCrawlType}
          />
          <Button type='submit'>Submit</Button>
        </Form>
      </Segment>
      <Link to="/orders">Back to Orders</Link>
    </div>
  );
};

export default OrderAddPage;