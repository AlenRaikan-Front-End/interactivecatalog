import React, { useState } from "react";

const categories = ["Наушники", "Клавиатуры", "Мониторы", "Мыши"];

interface Props {
    filters: {
        categories: string[];
        minPrice: number | null;
        maxPrice: number | null;
    };
    setFilters: React.Dispatch<React.SetStateAction<any>>;
}

const FilterPanel: React.FC<Props> = ({ filters, setFilters }) => {
    const [minPrice, setMinPrice] = useState(filters.minPrice || "");
    const [maxPrice, setMaxPrice] = useState(filters.maxPrice || "");
    const [selectedCategories, setSelectedCategories] = useState(
        filters.categories || []
    );

    const toggleCategory = (cat: string) => {
        let newCats = [...selectedCategories];
        if (newCats.includes(cat)) {
            newCats = newCats.filter((c) => c !== cat);
        } else {
            newCats.push(cat);
        }
        setSelectedCategories(newCats);
        setFilters((prev: any) => ({ ...prev, categories: newCats }));
    };

    const applyPriceFilter = () => {
        setFilters((prev: any) => ({
            ...prev,
            minPrice: minPrice === "" ? null : Number(minPrice),
            maxPrice: maxPrice === "" ? null : Number(maxPrice),
        }));
    };

    return (
        <div className="mb-6 p-4 border rounded-xl bg-white shadow text-black">
            <h3 className="text-lg font-semibold mb-3">Категории</h3>
            <div className="space-y-2">
                {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={selectedCategories.includes(cat)}
                            onChange={() => toggleCategory(cat)}
                            className="accent-blue-500"
                        />
                        <span>{cat}</span>
                    </label>
                ))}
            </div>

            <h3 className="text-lg font-semibold mt-6 mb-3">Цена</h3>
            <div className="flex flex-wrap gap-2 items-center">
                <input
                    type="number"
                    placeholder="Мин"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="border p-2 rounded w-24 text-black bg-gray-50"
                />
                <input
                    type="number"
                    placeholder="Макс"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="border p-2 rounded w-24 text-black bg-gray-50"
                />
                <button
                    onClick={applyPriceFilter}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                >
                    Применить
                </button>
            </div>
        </div>
    );
};

export default FilterPanel;
