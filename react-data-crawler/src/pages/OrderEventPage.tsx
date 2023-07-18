import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../store/store';
import { OrderEventGetAllQuery } from '../types/OrderEventTypes';
import { fetchOrderEvents } from '../store/features/orderEvent/orderEventSlice';
import { Table } from 'semantic-ui-react';

const OrderEventPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orderEvents = useSelector((state: RootState) => state.orderEvents.orderEvents);
  const isLoading = useSelector((state: RootState) => state.orderEvents.isLoading);
  const error = useSelector((state: RootState) => state.orderEvents.error);

  const selectedOrderId = useSelector((state: RootState) => state.orders.selectedOrder);

  if (!selectedOrderId) {
    return <div>No order event selected</div>;
  }

  useEffect(() => {
    
    const orderEventGetAllQuery:OrderEventGetAllQuery = {
      orderId:selectedOrderId,
    }
    console.log('Dispatching fetchOrderEvents...');
    dispatch(fetchOrderEvents(orderEventGetAllQuery));
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div>
      <h2>Order Event Details</h2>
      <div>Order ID: {selectedOrderId}</div>
      {/* Display other order event details */}
      <Link to="/orders">Back to Orders</Link>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Order Status</Table.HeaderCell>
            <Table.HeaderCell>Created On</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {orderEvents.map((orderEvent) => (
            <Table.Row key={orderEvent.orderId}>
              <Table.Cell>{orderEvent.orderStatus}</Table.Cell>
              <Table.Cell>{orderEvent.createdOn}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default OrderEventPage;