import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { FaTrash } from "react-icons/fa";
import { WishlistContext } from "../App";

const Wishlist = () => {
  const Navigate = useNavigate();
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  
  const handleProductPreview = (product) => {
    Navigate("/product-preview", { state: { product: product } });
  };

  // If wishlist is empty, don't render anything
  if (wishlist.length === 0) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-2 mt-6">
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

      {/* Single heading for the entire wishlist section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-brandOrange">Wishlist</h2>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={16}
        slidesPerView={2}
        navigation
        autoplay={{ delay: 3000 }}
        loop={wishlist.length > 2}
        className="pb-6"
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
      >
        {wishlist.map((item) => (
          <SwiperSlide key={item._id || item.id}>
            <div className="product-card group rounded-lg p-2 border hover:shadow-md transition flex flex-col">
              {/* Product Image */}
              <div className="relative mb-2 max-w-[160px] sm:max-w-[200px] mx-auto">
                <div className="w-full aspect-square rounded-lg flex items-center justify-center overflow-hidden text-xs bg-gray-100">
                  {item.images && item.images.length > 0 ? (
                    <img
                      src={item.images[0]}
                      alt={item.title || item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500 text-sm">
                      No Image
                    </span>
                  )}
                </div>
                {/* Bestseller Tag */}
                {item.sales > 0 && (
                  <span className="absolute top-1 left-1 bg-red-600 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                    Bestseller
                  </span>
                )}
              </div>

              {/* Product Details */}
              <div className="px-2 flex-grow flex flex-col">
                <h3 className="font-semibold text-sm text-gray-900 group-hover:text-gray-900 transition">
                  {item.title || item.name}
                </h3>
                <p className="text-gray-500 text-xs mt-1 flex-grow">
                  {(item.description || "").slice(0, 80)}...
                </p>

                <span>
                  {/* Price */}
                  <p className="text-brandOrange font-bold mt-1 text-sm">
                    Ksh. {(typeof item.price === 'number' ? item.price.toLocaleString() : item.price)}
                  </p>

                  {/* Stock Availability */}
                  {item.quantity !== undefined && (
                    <p
                      className={`mt-1 text-xs font-medium ${
                        item.quantity > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {item.quantity > 0 ? "In Stock" : "Out of Stock"}
                    </p>
                  )}
                </span>

                {/* Action Buttons */}
                <div className="flex space-x-2 mt-2">
                  {/* Shop Now Button */}
                  <button
                    className="bg-brandOrange text-white text-xs font-semibold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleProductPreview(item)}
                  >
                    Shop Now
                  </button>
                  
                  {/* Remove Button */}
                  <button
                    className="bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeFromWishlist(item._id || item.id)}
                  >
                    <FaTrash className="inline mr-1" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Wishlist;