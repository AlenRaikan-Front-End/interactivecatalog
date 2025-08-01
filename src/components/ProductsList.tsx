import React from "react";
import ProductCard from "./ProductCard";

type Product = {
    id: number;
    title: string;
    image: string;
    price: number;
};

type ProductListProps = {
    products: Product[];
};

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    return (
        <div className="text-black border border-gray-300 rounded-xl p-4 bg-white shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
