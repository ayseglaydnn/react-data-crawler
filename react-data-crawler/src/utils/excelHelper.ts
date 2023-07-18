import { WorkBook, utils, writeFile } from 'xlsx';
import { ProductGetAllDto } from '../types/ProductTypes';

export const exportProductsToExcel = (products: ProductGetAllDto[]) => {
    const worksheet = utils.json_to_sheet(products);
    const workbook: WorkBook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Products');
    const excelBuffer = writeFile(workbook, 'products.xlsx', { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    return data;
  };