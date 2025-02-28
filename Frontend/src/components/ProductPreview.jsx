import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import About from "./About";
import Footer from "./Footer";
import RecentlyViewed from "./RecentlyViewed";

const ProductPreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  const [selectedImage, setSelectedImage] = useState(
    product?.images?.[0] || product?.image
  );
  const [quantity, setQuantity] = useState(1);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">Product not found</p>
            <button
              className="mt-4 bg-brandOrange text-white font-semibold px-4 py-2 rounded-full"
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
          </div>
        </div>
        <About />
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow max-w-7xl mx-auto px-4 py-8">
        {/* Product Details Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Images - Modified for two-column layout */}
            <div className="flex gap-4">
              {/* Thumbnail Column - Vertical strip on the left */}
              {product.images && product.images.length > 0 && (
                <div className="flex flex-col gap-2 w-16">
                  {product.images.map((img, index) => (
                    <div
                      key={index}
                      className={`aspect-square cursor-pointer rounded-md overflow-hidden border-2 ${
                        selectedImage === img
                          ? "border-brandOrange"
                          : "border-transparent"
                      }`}
                      onClick={() => setSelectedImage(img)}
                    >
                      <img
                        src={img}
                        alt={`${product.title} - view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Main Image - Takes up most of the space on the right */}
              <div className="flex-1 aspect-square rounded-lg overflow-hidden border border-gray-200">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </div>
            </div>

            {/* Product Information */}
            <div className="space-y-4">
              {/* Basic Info */}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {product.title}
                </h1>
                <div className="mt-2 flex items-center">
                  {product.sales > 0 && (
                    <span className="bg-red-600 text-white px-2 py-0.5 rounded-full text-xs font-medium mr-2">
                      Bestseller
                    </span>
                  )}
                  <p
                    className={`text-sm font-medium ${
                      product.quantity > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="mt-4">
                <p className="text-3xl font-bold text-brandOrange">
                  Ksh. {product.price.toLocaleString()}
                </p>
              </div>

              {/* Description */}
              <div className="mt-4 border-t border-gray-200 pt-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Description
                </h3>
                <p className="mt-2 text-gray-600 text-sm">
                  {product.description}
                </p>
              </div>

              {/* Categories and Keywords */}
              <div className="mt-4 border-t border-gray-200 pt-4">
                <div className="mb-2">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Categories:
                  </h3>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {product.category &&
                      product.category.map((cat, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                        >
                          {cat}
                        </span>
                      ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Keywords:
                  </h3>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {product.keywords &&
                      product.keywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                        >
                          {keyword}
                        </span>
                      ))}
                  </div>
                </div>
              </div>

              {/* Quantity Selector */}
              {product.quantity > 0 && (
                <div className="mt-6 border-t border-gray-200 pt-4">
                  <div className="flex items-center">
                    <span className="mr-3 text-sm font-medium text-gray-900">
                      Quantity:
                    </span>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        className="p-2 text-gray-600 hover:text-gray-900"
                        disabled={quantity <= 1}
                        onClick={() =>
                          quantity > 1 && setQuantity(quantity - 1)
                        }
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M20 12H4"
                          ></path>
                        </svg>
                      </button>
                      <input
                        type="number"
                        min="1"
                        max={product.quantity}
                        value={quantity}
                        onChange={(e) =>
                          setQuantity(
                            Math.min(
                              product.quantity,
                              Math.max(1, parseInt(e.target.value) || 1)
                            )
                          )
                        }
                        className="w-12 text-center border-none focus:outline-none text-gray-900"
                      />
                      <button
                        className="p-2 text-gray-600 hover:text-gray-900"
                        disabled={quantity >= product.quantity}
                        onClick={() =>
                          quantity < product.quantity &&
                          setQuantity(quantity + 1)
                        }
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4v16m8-8H4"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Buy Buttons - on the same line */}
              <div className="mt-6 flex space-x-2">
                <button
                  className={`flex-1 py-3 px-4 rounded-full font-semibold text-white ${
                    product.quantity > 0
                      ? "bg-brandOrange hover:bg-orange-600"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={product.quantity === 0}
                >
                  Add to Cart
                </button>
                <button className="flex-1 py-3 px-4 border border-brandOrange text-brandOrange rounded-full font-semibold hover:bg-orange-50">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* About and Footer components */}
      <RecentlyViewed />
      <About />
      <Footer />
    </div>
  );
};

export default ProductPreview;
