import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import About from "./About";
import Footer from "./Footer";

import { CartContext } from "../App";

// set the base url for different environments
const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;
const PROD_URL_BASE = import.meta.env.VITE_PROD_URL_BASE;
const BASE_URL =
  ENVIRONMENT === "DEVELOPMENT" ? "http://localhost:5000" : PROD_URL_BASE;

const SearchOrCategory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageTitle, setPageTitle] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const queryParams = new URLSearchParams(location.search);
      const category = queryParams.get("category");
      const keywords = queryParams.get("keywords");

      // Set page title based on search parameters
      if (category) {
        setPageTitle(category);
      } else if (keywords) {
        setPageTitle(`Search results for "${keywords}"`);
      } else {
        setPageTitle("All Products");
      }

      let url = "";
      if (category) {
        url = `${BASE_URL}/api/products/category/${encodeURIComponent(
          category
        )}`;
      } else if (keywords) {
        url = `${BASE_URL}/api/products/keywords?keywords=${encodeURIComponent(
          keywords
        )}`;
      }

      if (!url) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchProducts();
  }, [location.search]);

  const handleProductPreview = (product) => {
    navigate("/product-preview", { state: { product } });
  };

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
    <div>
      <div className="max-w-7xl mx-auto px-2 py-6">
        <div className="flex items-center justify-between mb-4">
          {pageTitle && (
            <h2 className="text-xl font-bold text-brandOrange">{pageTitle}</h2>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8">
            {[...Array(5)].map((_, index) => (
              <ProductSkeleton key={`skeleton-${index}`} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-red-500 font-semibol text-center">
            Oops! No products found. Try again later
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="product-card group border shadow-sm rounded-lg p-2 hover:shadow-md transition"
              >
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
                  {product.sales > 0 && (
                    <span className="absolute top-1 left-1 bg-red-600 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                      Bestseller
                    </span>
                  )}
                </div>
                {/* Product Details */}
                <div className="px-2">
                  <h3 className="font-semibold text-sm text-gray-900 group-hover:text-gray-900 transition">
                    {product.name || product.title}
                  </h3>
                  <p className="text-gray-500 text-xs mt-1">
                    {product.description?.slice(0, 100)}...
                  </p>
                  {/* Price */}
                  <p className="text-brandOrange font-bold mt-1 text-sm">
                    Ksh. {product.price.toLocaleString()}
                  </p>
                  {/* Stock Availability */}
                  <p
                    className={`mt-1 text-xs font-medium ${
                      product.quantity > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                  </p>
                  {/* Shop Now Button */}
                  <div className="flex flex-col gap-y-2 justify-between mt-3">
                    <button
                      className="bg-brandOrange border border-brandOrange w-full text-white text-xs font-semibold px-3 py-1 rounded-md md:opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => addToCart(product, 1)}
                    >
                      Add To Cart
                    </button>
                    <button
                      className="border border-brandOrange w-full text-brandOrange text-xs font-semibold px-3 py-1 rounded-md md:opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleProductPreview(product)}
                    >
                      More Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <About />
      <Footer />
    </div>
  );
};

export default SearchOrCategory;
