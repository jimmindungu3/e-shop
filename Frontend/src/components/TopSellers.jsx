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

const TopSellers = () => {
  return (
    <div className="max-w-7xl mx-auto px-2">
      <style>
        {`
          .swiper-button-next,
          .swiper-button-prev {
            width: 32px !important;
            height: 32px !important;
            background-color: #f3f4f6;
            border-radius: 50%;
            color: #6b7280 !important;
          }
          .swiper-button-next:hover,
          .swiper-button-prev:hover {
            background-color: #e5e7eb;
          }
          .swiper-button-next::after,
          .swiper-button-prev::after {
            font-size: 14px !important;
            font-weight: bold;
          }
          .swiper-button-disabled {
            opacity: 0 !important;
          }
        `}
      </style>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={8}
        slidesPerView={2} // default for extra-small screens
        navigation
        autoplay={{ delay: 3000 }}
        loop
        className="pb-6"
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
      >
        {trendingProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="product-card group bg-white shadow-sm rounded-lg p-1.5 cursor-pointer hover:shadow-md transition">
              <div className="relative mb-1.5 max-w-[150px] sm:max-w-[180px] mx-auto">
                <div className="w-full aspect-square bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden text-xs">
                  <span className="text-gray-500 text-sm">{product.name}</span>
                </div>
                <span className="absolute top-1 left-1 bg-red-600 text-white px-1.5 py-0.5 rounded-full text-xs font-medium">
                  {product.tag}
                </span>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-sm text-gray-900 group-hover:text-gray-900 transition">
                  {product.name}
                </h3>
                <p className="text-gray-700 font-bold mt-1 text-xs">{product.price}</p>
                <button className="mt-2 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  Shop Now
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopSellers;
