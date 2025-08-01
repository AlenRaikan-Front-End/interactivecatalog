"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Product, CartItem } from "@/types/Product";
import { toast } from "react-toastify";

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    updateQuantity: (id: number, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: Product) => {
        setCart((prev) => {
            const exists = prev.find((p) => p.id === product.id);
            if (exists) {
                toast.info("Количество товара увеличено");
                return prev.map((p) =>
                    p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
                );
            }
            toast.success("Товар добавлен в корзину");
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id: number) => {
        toast.warn("Товар удалён из корзины");
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        toast.error("Корзина очищена");
        setCart([]);
    };

    const updateQuantity = (id: number, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(id);
        } else {
            setCart((prev) =>
                prev.map((item) =>
                    item.id === id ? { ...item, quantity } : item
                )
            );
            toast.info("Количество обновлено");
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
