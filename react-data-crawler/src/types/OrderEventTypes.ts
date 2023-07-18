export type OrderEventGetAllDto = {
    orderId:string;
    orderStatus:string;
    createdOn:string;
};

export type OrderEventGetAllQuery = {
    orderId: string;
};