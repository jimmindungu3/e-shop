import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const WishList = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Hardcoded array of recently viewed products
  // You can replace this later with data from localStorage or cookies
  const recentProducts = [
    {
      _id: "prod001",
      title: "Wireless Bluetooth Headphones",
      description:
        "High-quality noise cancelling headphones with 20 hour battery life and comfortable fit.",
      price: 4999,
      quantity: 15,
      images: [
        "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c29mYXxlbnwwfHwwfHx8MA%3D%3D",
      ],
      sales: 120,
    },
    {
      _id: "prod002",
      title: "Smart Watch Series 5",
      description:
        "Track your fitness, answer calls, and stay connected with this premium smartwatch.",
      price: 9999,
      quantity: 8,
      images: [
        "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c29mYXxlbnwwfHwwfHx8MA%3D%3D",
      ],
      sales: 78,
    },
    {
      _id: "prod003",
      title: "Portable Bluetooth Speaker",
      description:
        "Waterproof speaker with deep bass and 12-hour playtime for outdoor adventures.",
      price: 2499,
      quantity: 23,
      images: [
        "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c29mYXxlbnwwfHwwfHx8MA%3D%3D",
      ],
      sales: 205,
    },
    {
      _id: "prod004",
      title: "Wireless Charging Pad",
      description:
        "Fast wireless charger compatible with all Qi-enabled smartphones and accessories.",
      price: 1299,
      quantity: 42,
      images: [
        "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c29mYXxlbnwwfHwwfHx8MA%3D%3D",
      ],
      sales: 0,
    },
    {
      _id: "prod005",
      title: "USB-C to HDMI Adapter",
      description:
        "Connect your laptop to external displays with this reliable high-speed adapter.",
      price: 899,
      quantity: 0,
      images: [
        "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c29mYXxlbnwwfHwwfHx8MA%3D%3D",
      ],
      sales: 53,
    },
    {
      _id: "prod006",
      title: "Ergonomic Computer Mouse",
      description:
        "Reduce wrist strain with this comfortable wireless ergonomic mouse.",
      price: 1899,
      quantity: 19,
      images: [
        "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c29mYXxlbnwwfHwwfHx8MA%3D%3D",
      ],
      sales: 45,
    },
  ];

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const navigateToProduct = (product) => {
    navigate(`/product-preview`, { state: { product } });
  };

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
    <div className="max-w-7xl mx-auto px-2 mb-8">
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

      <div className="flex mb-4">
        <h2 className="text-2xl font-bold text-brandOrange">My Wish List</h2>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={16}
        slidesPerView={2}
        navigation
        autoplay={
          !loading ? { delay: 4000, disableOnInteraction: false } : false
        }
        loop={!loading && recentProducts.length > 3}
        className="pb-6"
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
      >
        {loading
          ? [...Array(4)].map((_, index) => (
              <SwiperSlide key={`skeleton-${index}`}>
                <ProductSkeleton />
              </SwiperSlide>
            ))
          : recentProducts.map((product) => (
              <SwiperSlide key={product._id}>
                <div className="product-card border rounded-lg p-2 group hover:shadow-md transition">
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
                        <span className="text-gray-500 text-sm">No Image</span>
                      )}
                    </div>
                    {/* Bestseller Tag */}
                  </div>

                  {/* Product Details */}
                  <div className="px-2">
                    <h3 className="font-semibold text-sm text-gray-900 group-hover:text-gray-900 transition line-clamp-1">
                      {product.title}
                    </h3>
                    <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                      {product.description}
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

                    {/* View Again Button */}
                    <button
                      className="mt-2 bg-brandOrange text-white text-xs font-semibold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => navigateToProduct(product)}
                    >
                      View Again
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};

export default WishList;
