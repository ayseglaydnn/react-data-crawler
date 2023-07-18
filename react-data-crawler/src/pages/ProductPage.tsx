import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../store/store';
import { useEffect } from 'react';
import { ProductGetAllQuery } from '../types/ProductTypes';
import { exportProducts, fetchProducts } from '../store/features/product/productSlice';
import { Button, Grid, Table } from 'semantic-ui-react';

const ProductPage = () => {

  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);
  const isLoading = useSelector((state: RootState) => state.products.isLoading);
  const error = useSelector((state: RootState) => state.products.error);

  const selectedOrderId = useSelector((state: RootState) => state.orders.selectedOrder);

  if (!selectedOrderId) {
    return <div>No product selected</div>;
  }

  useEffect(() => {
    
    const productsGetAllQuery:ProductGetAllQuery = {
      orderId:selectedOrderId,
    }
    console.log('Dispatching fetchProducts...');
    dispatch(fetchProducts(productsGetAllQuery));
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleExportProducts = () => {
    dispatch(exportProducts(products));
  };

  return (
    <div>
      <Grid columns={2} stackable>
        <Grid.Column>
          <h2>Product Details</h2>
          <div>Order ID: {selectedOrderId}</div>
          {/* Display other product details */}
          <Link to="/orders">Back to Orders</Link>
        </Grid.Column>
        <Grid.Column textAlign="right">
          <Button primary onClick={handleExportProducts}>
            Export to Excel
          </Button>
        </Grid.Column>
      </Grid>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Product Id</Table.HeaderCell>
            <Table.HeaderCell>Picture</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Is On Sale</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Sale Price</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {products.map((product) => (
            <Table.Row key={product.id}>
              <Table.Cell>{product.id}</Table.Cell>
              <Table.Cell><img src={product.picture} alt={product.name} style={{ width: '100px', height: '100px' }} /></Table.Cell>
              <Table.Cell>{product.name}</Table.Cell>
              <Table.Cell>
                {product.isOnSale ? "Sale" : "-"}
              </Table.Cell>
              <Table.Cell>{product.price}</Table.Cell>
              <Table.Cell>{product.salePrice}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default ProductPage;