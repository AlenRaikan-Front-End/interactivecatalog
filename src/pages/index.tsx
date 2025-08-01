"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import ProductList from "@/components/ProductsList";
import Cart from "@/components/Cart";
import SearchBar from "@/components/SearchBar";
import FilterPanel from "@/components/FilterPanel";
import Pagination from "@/components/Pagination";
import { mockProducts } from "@/services/api"; //

const ITEMS_PER_PAGE = 4;

type Category = "Наушники" | "Клавиатуры" | "Мониторы" | "Мыши" | "Другое";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<{
    categories: Category[];
    minPrice: number | null;
    maxPrice: number | null;
  }>({
    categories: [],
    minPrice: null,
    maxPrice: null,
  });
  const [currentPage, setCurrentPage] = useState(1);

  const getCategory = (title: string): Category => {
    const lower = title.toLowerCase();
    if (lower.includes("наушник")) return "Наушники";
    if (lower.includes("клавиатур")) return "Клавиатуры";
    if (lower.includes("монитор")) return "Мониторы";
    if (lower.includes("мыш")) return "Мыши";
    return "Другое";
  };

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(getCategory(product.title));
    const matchesMinPrice = filters.minPrice === null || product.price >= filters.minPrice;
    const matchesMaxPrice = filters.maxPrice === null || product.price <= filters.maxPrice;

    return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice;
  });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(start, start + ITEMS_PER_PAGE);

  return (
      <>
        <Header />
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-6">Каталог товаров</h1>

          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <FilterPanel filters={filters} setFilters={setFilters} />

          <ProductList products={currentProducts} />

          <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
          />

          <Cart />
        </main>
      </>
  );
}
