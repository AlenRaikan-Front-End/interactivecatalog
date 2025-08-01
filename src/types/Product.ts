export interface Product {
    id: number;
    title: string;
    image: string;
    price: number;
    description?: string; //
}

export interface CartItem extends Product {
    quantity: number;
}
