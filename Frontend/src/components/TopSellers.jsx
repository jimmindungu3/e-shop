import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const TopSellers = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products/random");
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setBestSellers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching best seller products:", error);
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  // Skeleton loader component
  const ProductSkeleton = () => (
    <div className="product-card group bg-white shadow-sm rounded-lg p-1.5">
      <div className="relative mb-1.5 max-w-[150px] sm:max-w-[180px] mx-auto">
        <div className="w-full aspect-square bg-gray-200 animate-pulse rounded-lg" />
      </div>
      <div className="text-center">
        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mt-2 animate-pulse" />
        <div className="h-3 bg-gray-200 rounded w-1/4 mx-auto mt-1 animate-pulse" />
        <div className="h-6 bg-gray-200 rounded-full w-2/4 mx-auto mt-2 animate-pulse" />
      </div>
    </div>
  );

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
        slidesPerView={2}
        navigation
        autoplay={!loading ? { delay: 3000 } : false}
        loop={!loading}
        className="pb-6"
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
      >
        {loading ? (
          // Show skeleton slides while loading
          [...Array(5)].map((_, index) => (
            <SwiperSlide key={`skeleton-${index}`}>
              <ProductSkeleton />
            </SwiperSlide>
          ))
        ) : (
          // Show actual products when loaded
          bestSellers.map((product) => (
            <SwiperSlide key={product._id}>
              <div className="product-card group bg-white shadow-sm rounded-lg p-1.5 cursor-pointer hover:shadow-md transition">
                <div className="relative mb-1.5 max-w-[150px] sm:max-w-[180px] mx-auto">
                  <div className="w-full aspect-square rounded-lg flex items-center justify-center overflow-hidden text-xs">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500 text-sm">{product.title}</span>
                    )}
                  </div>
                  {product.sales > 0 && (
                    <span className="absolute top-1 left-1 bg-red-600 text-white px-1.5 py-0.5 rounded-full text-xs font-medium">
                      Bestseller
                    </span>
                  )}
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-sm text-gray-900 group-hover:text-gray-900 transition">
                    {product.title}
                  </h3>
                  <p className="text-gray-700 font-bold mt-1 text-xs">
                    ${product.price}
                  </p>
                  <button className="mt-2 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    Shop Now
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
};

export default TopSellers;