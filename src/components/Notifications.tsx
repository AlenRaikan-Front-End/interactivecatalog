"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Notifications = () => {
    return <ToastContainer position="top-right" autoClose={3000} theme="colored" />;
};
