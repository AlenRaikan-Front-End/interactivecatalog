"use client";
import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const Header = () => {
    const { cart } = useCart();
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white shadow-md">
            <Link href="/">
                <h1 className="text-2xl font-bold">Магазин</h1>
            </Link>
            <Link href="/cart" className="relative">
                <span className="text-xl">🛒</span>
                {totalCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {totalCount}
          </span>
                )}
            </Link>
        </header>
    );
};

export default Header;
