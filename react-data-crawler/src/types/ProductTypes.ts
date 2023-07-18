export type ProductGetAllDto = {
    id: string;
    oderId:string;
    orderRequestedAmount:number;
    orderTotalFountAmount:number;
    crawlType:string;
    name: string;
    picture: string;
    isOnSale: boolean;
    price: number;
    salePrice: number | null;
};

export type ProductGetAllQuery = {
    orderId: string;
};