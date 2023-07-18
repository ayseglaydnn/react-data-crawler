import React, { useState } from "react";
import { Button, Form, Input, Header, Segment } from "semantic-ui-react";
import api from "../utils/axiosInstance.ts";
import { ApiResponse } from "../types/GenericTypes.ts";
import { Link } from 'react-router-dom';
import { OrderAddCommand } from "../types/OrderTypes";

const OrderAddPage = () => {
  const saleOptions = [
    { key: 'a', text: 'All', value: '0' },
    { key: 'od', text: 'OnDiscount', value: '1' },
    { key: 'nd', text: 'NonDiscount', value: '2' }
  ];

  const [order, setOrder] = useState<OrderAddCommand>({
    requestedAmount: 0,
    productCrawlType: 0,
    email: '',
    name: '',
  });

  const [formErrors, setFormErrors] = useState({
    requestedAmount: false,
    productCrawlType: false
  });

  const handleSubmit = async () => {
    if (validateForm()) {
      const response = await api.post<ApiResponse<string>>("/Orders", order);
      if (response.data) {
        console.log(`Order with ID: ${response.data.data} added successfully.`);
        // You can redirect to accounts page or show success message here.
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