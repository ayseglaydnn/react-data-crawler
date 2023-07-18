export type OrderGetAllDto = {
    id: string;
    requestedAmount: number;
    totalFountAmount: number;
    productCrawlType: string | null;
    createdByUserId: string;
    createdOn:Date;
};

export type OrderGetAllQuery = {
    createdByUserId: string;
};

export type OrderGetAllProductDto = {

};

export type OrderAddCommand = {
    requestedAmount:number;
    productCrawlType:number;
    email:string;
    name:string;
};