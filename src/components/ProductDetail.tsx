import React from "react";
import { useCart } from "@/context/CartContext";

type Product = {
    id: number;
    title: string;
    image: string;
    price: number;
    description?: string;
};

type ProductDetailProps = {
    product: Product;
};

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg text-black">
            <img
                src={product.image}
                alt={product.title}
                className="w-full h-64 object-cover rounded-xl mb-6"
            />
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <p className="text-lg text-gray-800 mb-4">${product.price.toFixed(2)}</p>
            <p className="text-gray-600 mb-6">
                {product.description || "Описание товара скоро будет добавлено."}
            </p>
            <button
                onClick={() => addToCart(product)}
                className="bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition"
            >
                Добавить в корзину
            </button>
        </div>
    );
};

export default ProductDetail;
