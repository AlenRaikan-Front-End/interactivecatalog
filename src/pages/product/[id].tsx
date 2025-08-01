"use client";
import { useRouter } from "next/router";
import React from "react";
import { Product } from "@/types/Product";
import ProductDetail from "@/components/ProductDetail";
import { mockProducts } from "@/services/api"; //

const ProductPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const product = mockProducts.find((p) => p.id === Number(id));

    if (!product) return <p className="text-center mt-10 text-gray-600">Товар не найден</p>;

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <button
                onClick={() => router.back()}
                className="mb-6 text-blue-600 underline hover:text-blue-800"
            >
                ← Назад к каталогу
            </button>

            <ProductDetail product={product} />
        </div>
    );
};

export default ProductPage;
