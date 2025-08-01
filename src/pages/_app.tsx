import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CartProvider } from "@/context/CartContext";
import { Notifications } from "@/components/Notifications";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <CartProvider>
            <Notifications />
            <Component {...pageProps} />
        </CartProvider>
    );
}
