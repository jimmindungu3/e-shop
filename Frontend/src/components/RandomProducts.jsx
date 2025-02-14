import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const trendingProducts = [
  { id: 1, name: "Wireless Earbuds", price: "$129", tag: "Hot Deal" },
  { id: 2, name: "Gaming Laptop", price: "$1,299", tag: "New Arrival" },
  { id: 3, name: "4K Smart TV", price: "$899", tag: "Bestseller" },
  { id: 4, name: "Bluetooth Speaker", price: "$79", tag: "Trending" },
  { id: 5, name: "DSLR Camera", price: "$599", tag: "Limited Stock" },
  { id: 6, name: "Fitness Tracker", price: "$99", tag: "Popular" },
];

const RandomProducts = () => {
  const randomProducts = [...trendingProducts, ...trendingProducts].sort(() => 0.5 - Math.random()).slice(0, 15);
  
  return (
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Stock</h2>
      <div className="grid grid-cols-5 gap-4">
        {randomProducts.map((product) => (
          <div key={product.id} className="bg-white shadow-sm rounded-lg p-3 text-center">
            <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden text-xs p-2">
              <span className="text-gray-500 text-sm">{product.name}</span>
            </div>
            <h3 className="font-semibold text-sm text-gray-900 mt-2">{product.name}</h3>
            <p className="text-gray-700 font-bold mt-1 text-xs">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RandomProducts;
