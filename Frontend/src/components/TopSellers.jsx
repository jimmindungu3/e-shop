import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const TopSellers = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products/random");
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setBestSellers(data);
      } catch (error) {
        console.error("Error fetching best seller products:", error);
        setTimeout(() => setError(true), 10000);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchBestSellers();
  }, []);

  // Skeleton loader component
  const ProductSkeleton = () => (
    <div className="product-card group bg-white shadow-sm rounded-lg p-2">
      <div className="relative mb-2 max-w-[150px] sm:max-w-[180px] mx-auto">
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
        <h2 className="text-2xl font-bold text-brandOrange">Top Sellers</h2>
      </div>

      {error ? (
        <p className="text-red-500 text-center">
          Failed to load products. Please try again.
        </p>
      ) : (
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={16}
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
          {loading
            ? [...Array(5)].map((_, index) => (
                <SwiperSlide key={`skeleton-${index}`}>
                  <ProductSkeleton />
                </SwiperSlide>
              ))
            : bestSellers.map((product) => (
                <SwiperSlide key={product._id}>
                  <div className="product-card group bg-white shadow-sm rounded-lg p-2 cursor-pointer hover:shadow-md transition">
                    {/* Product Image */}
                    <div className="relative mb-2 max-w-[160px] sm:max-w-[200px] mx-auto">
                      <div className="w-full aspect-square rounded-lg flex items-center justify-center overflow-hidden text-xs bg-gray-100">
                        {product.images && product.images.length > 0 ? (
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-500 text-sm">
                            No Image
                          </span>
                        )}
                      </div>
                      {/* Bestseller Tag */}
                      {product.sales > 0 && (
                        <span className="absolute top-1 left-1 bg-red-600 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                          Bestseller
                        </span>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="px-2">
                      <h3 className="font-semibold text-sm text-gray-900 group-hover:text-gray-900 transition">
                        {product.title}
                      </h3>
                      <p className="text-gray-500 text-xs mt-1">
                        {product.description.slice(0, 100)}...
                      </p>

                      <span>
                        {/* Price */}
                        <p className="text-brandOrange font-bold mt-1 text-sm">
                          Ksh. {product.price.toLocaleString()}
                        </p>

                        {/* Stock Availability */}
                        <p
                          className={`mt-1 text-xs font-medium ${
                            product.quantity > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                        </p>
                      </span>

                      {/* Shop Now Button */}
                      <button className="mt-2 bg-brandOrange text-white text-xs font-medium px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        Shop Now
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>
      )}
    </div>
  );
};

export default TopSellers;
