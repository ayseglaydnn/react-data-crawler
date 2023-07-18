import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Icon, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { fetchOrders, selectOrder } from '../store/features/order/orderSlice';
import { AppDispatch, RootState } from '../store/store';
import { OrderGetAllQuery } from '../types/OrderTypes';
import { LocalJwt } from '../types/AuthTypes';
import { getClaimsFromJwt } from '../utils/jwtHelper.ts';
import {orderBy} from 'lodash';
import { deleteOrder } from '../store/features/order/orderSlice';

const OrderPage = () => {

  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector((state: RootState) => state.orders.orders);
  const isLoading = useSelector((state: RootState) => state.orders.isLoading);
  const error = useSelector((state: RootState) => state.orders.error);

  // Sort the orders by creation time in descending order
  const sortedOrders = orderBy(orders, 'createdOn', 'desc');
  
  const handleDeleteOrder = (orderId: string) => {
    dispatch(deleteOrder(orderId));
  };

  useEffect(() => {

    const jwtJson = localStorage.getItem("localUser");
    const localJwt: LocalJwt = JSON.parse(jwtJson as string );
    const {uid} = getClaimsFromJwt(localJwt.accessToken);
    
    const ordersGetAllQuery:OrderGetAllQuery = {
      createdByUserId:uid,
    }
    console.log('Dispatching fetchOrders...');
    dispatch(fetchOrders(ordersGetAllQuery));
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Link to="/orders/add">Add Order</Link>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Creation Time</Table.HeaderCell>
            <Table.HeaderCell>Order Id</Table.HeaderCell>
            <Table.HeaderCell>Product Crawl Type</Table.HeaderCell>
            <Table.HeaderCell>Requested Amount</Table.HeaderCell>
            <Table.HeaderCell>Total Fount Amount</Table.HeaderCell>
            <Table.HeaderCell>Products</Table.HeaderCell>
            <Table.HeaderCell>Order Events</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortedOrders.map((order) => (
            <Table.Row key={order.id}>
              <Table.Cell>{order.createdOn}</Table.Cell>
              <Table.Cell>{order.id}</Table.Cell>
              <Table.Cell>{order.productCrawlType}</Table.Cell>
              <Table.Cell>{order.requestedAmount}</Table.Cell>
              <Table.Cell>{order.totalFountAmount}</Table.Cell>
              <Table.Cell>
                <Link
                  to={`/products/${order.id}`}
                  onClick={() => dispatch(selectOrder(order.id))}
                >
                  Products
                </Link>
              </Table.Cell>
              <Table.Cell>
                <Link
                  to={`/orderEvents/${order.id}`}
                  onClick={() => dispatch(selectOrder(order.id))}
                >
                  Order Events
                </Link>
              </Table.Cell>
              <Table.Cell>
                <Button onClick={() => handleDeleteOrder(order.id)}><Icon name="trash" /></Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default OrderPage;