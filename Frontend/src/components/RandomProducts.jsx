import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const RandomProducts = () => {
  const [randomProducts, setRandomProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandomProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products/random");
        const data = await response.json();
        setRandomProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchRandomProducts();
  }, []);

  // Skeleton loader component
  const ProductSkeleton = () => (
    <div className="p-3 text-center">
      <div className="aspect-square rounded-md bg-gray-200 animate-pulse" />
      <div className="h-4 bg-gray-200 rounded mt-2 animate-pulse" />
      <div className="h-3 bg-gray-200 rounded mt-1 w-1/2 mx-auto animate-pulse" />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Stock</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-0.5 md:gap-1 lg:gap-2">
        {loading ? (
          // Show 10 skeleton loaders while loading
          [...Array(10)].map((_, index) => (
            <ProductSkeleton key={`skeleton-${index}`} />
          ))
        ) : (
          // Show actual products when loaded
          randomProducts.map((product) => (
            <div
              key={product._id}
              className="p-3 text-center"
            >
              <div className="aspect-square flex items-center justify-center overflow-hidden text-xs p-2">
                {product.images && product.images.length > 0 && (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                )}
              </div>
              <h3 className="font-semibold text-sm text-gray-900 mt-2">
                {product.title}
              </h3>
              <p className="text-gray-700 font-bold mt-1 text-xs">
                ${product.price}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RandomProducts;