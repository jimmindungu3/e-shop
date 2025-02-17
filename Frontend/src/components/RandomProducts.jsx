import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const RandomProducts = () => {
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    const fetchRandomProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products/random");
        const data = await response.json();
        setRandomProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchRandomProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Stock</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-0.5 md:gap-1 lg:gap-2">
        {randomProducts.map((product) => (
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
        ))}
      </div>
    </div>
  );
};

export default RandomProducts;
