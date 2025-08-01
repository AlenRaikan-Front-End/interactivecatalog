"use client";
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { toast } from "react-toastify";
import { mockProducts } from "@/services/api"; //

const Cart = () => {
    const { cart, removeFromCart, clearCart, updateQuantity, addToCart } = useCart();

    const [isCheckout, setIsCheckout] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [isDraggingOver, setIsDraggingOver] = useState(false);

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDraggingOver(false);

        const id = e.dataTransfer.getData("productId");
        const product = mockProducts.find((p) => p.id.toString() === id);
        if (product) {
            addToCart(product);
            toast.success(`${product.title} добавлен в корзину (перетаскиванием)`);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDraggingOver(true);
    };

    const handleDragLeave = () => {
        setIsDraggingOver(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !address) {
            alert("Пожалуйста, заполните все поля.");
            return;
        }

        alert("Спасибо за заказ, " + name + "!");
        clearCart();
        setIsCheckout(false);
        setName("");
        setEmail("");
        setAddress("");
    };

    return (
        <div
            className={`p-6 bg-white shadow-md rounded-2xl max-w-md mx-auto mt-8 text-black transition ${
                isDraggingOver ? "ring-4 ring-blue-400" : ""
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        >
            <h2 className="text-2xl font-bold mb-4">Корзина</h2>

            {cart.length === 0 ? (
                <p className="text-gray-600">Корзина пуста. Перетащите сюда товар 🛒</p>
            ) : (
                <>
                    <ul>
                        {cart.map((item) => (
                            <li key={item.id} className="mb-3 border-b pb-2">
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <span className="font-medium">{item.title}</span>
                                        <div className="flex items-center gap-2 mt-1">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                            >
                                                −
                                            </button>
                                            <span className="w-6 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="ml-4 text-red-600 hover:underline"
                                        >
                                            Удалить
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <p className="mt-4 font-semibold text-lg">Итого: ${total.toFixed(2)}</p>

                    {!isCheckout ? (
                        <div className="flex gap-2 mt-5">
                            <button
                                onClick={() => setIsCheckout(true)}
                                className="bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700 transition"
                            >
                                Оформить заказ
                            </button>
                            <button
                                onClick={clearCart}
                                className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600 transition"
                            >
                                Очистить
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                            <input
                                type="text"
                                placeholder="Ваше имя"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-3 border border-gray-400 rounded-xl bg-gray-100 text-black"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 border border-gray-400 rounded-xl bg-gray-100 text-black"
                                required
                            />
                            <textarea
                                placeholder="Адрес доставки"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full p-3 border border-gray-400 rounded-xl bg-gray-100 text-black"
                                required
                            />
                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
                                >
                                    Подтвердить
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsCheckout(false)}
                                    className="text-gray-500 underline hover:text-gray-700 transition"
                                >
                                    Отмена
                                </button>
                            </div>
                        </form>
                    )}
                </>
            )}
        </div>
    );
};

export default Cart;
