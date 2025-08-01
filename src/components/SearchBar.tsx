"use client";
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { mockProducts } from "@/services/api";

type SearchBarProps = {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
    const [inputValue, setInputValue] = useState(searchQuery);
    const [suggestions, setSuggestions] = useState<string[]>([]);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (inputValue.trim() === "") {
                setSuggestions([]);
                return;
            }

            const filtered = mockProducts
                .filter((product) =>
                    product.title.toLowerCase().includes(inputValue.toLowerCase())
                )
                .slice(0, 5)
                .map((product) => product.title);

            setSuggestions(filtered);
        }, 300);

        return () => clearTimeout(handler);
    }, [inputValue]);

    const handleSelect = (value: string) => {
        setInputValue(value);
        setSearchQuery(value);
        setSuggestions([]);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchQuery(inputValue);
        setSuggestions([]);
    };

    return (
        <div className="relative mb-6">
            <form onSubmit={handleSubmit}>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                    type="text"
                    placeholder="Поиск товаров..."
                    value={inputValue}
                    onChange={handleChange}
                    className="w-full pl-10 p-3 border border-gray-400 rounded-xl bg-white text-black placeholder-gray-500"
                />
            </form>

            {suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-xl mt-1 shadow-lg">
                    {suggestions.map((suggestion, idx) => (
                        <li
                            key={idx}
                            onClick={() => handleSelect(suggestion)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-xl text-black"
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
