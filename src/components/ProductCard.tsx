"use client";
import React from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

type Product = {
    id: number;
    title: string;
    image: string;
    price: number;
};

type ProductCardProps = {
    product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCart();
    const router = useRouter();

    const handleCardClick = () => {
        router.push(`/product/${product.id}`);
    };

    const handleDragStart = (e: React.DragEvent) => {
        e.dataTransfer.setData("productId", product.id.toString());
    };

    return (
        <div
            className="bg-white text-black border border-gray-300 rounded-2xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
            draggable
            onDragStart={handleDragStart}
        >
            <div onClick={handleCardClick} className="cursor-pointer">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                    <h3 className="text-lg font-semibold">{product.title}</h3>
                    <p className="text-gray-800 font-medium mt-2">
                        ${product.price.toFixed(2)}
                    </p>
                </div>
            </div>
            <div className="px-4 pb-4">
                <button
                    onClick={() => addToCart(product)}
                    className="mt-2 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
                >
                    Добавить в корзину
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
