import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Hero = () => {
  const slideImages = [
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFjYm9va3xlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amV3ZWxsZXJ5fGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1500995617113-cf789362a3e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dG95c3xlbnwwfHwwfHx8MA%3D%3D"
  ];

  return (
    <div className="max-w-7xl mx-auto hidden md:flex pt-4 mb-6">
      {/* Left Column: Categories */}
      <div className="w-1/4">
        {[
          {
            title: "Electronics",
            items: "Fridges, Electric Kettle, Blender, TV, Speakers",
          },
          {
            title: "Fashion & Style",
            items: "Shoes, T-Shirts, Watches, Sunglasses, Bags",
          },
          {
            title: "Home & Kitchen",
            items: "Cookware, Dishes, Blenders, Curtains, Lamps",
          },
          {
            title: "Sports & Fitness",
            items: "Dumbbells, Yoga Mats, Treadmills, Cycling Gear",
          },
          {
            title: "Toys & Games",
            items: "Board Games, Dolls, Action Figures, Puzzles",
          },
          {
            title: "Beauty & Health",
            items: "Makeup, Skincare, Perfumes, Supplements",
          },
          {
            title: "Automotive",
            items: "Car Covers, Engine Oil, Air Fresheners, Tools",
          },
          {
            title: "Office Supplies",
            items: "Desks, Chairs, Printers, Notebooks, Whiteboards",
          },
        ].map((category, index) => (
          <div
            key={index}
            className="px-3 py-1 hover:bg-gray-200 cursor-pointer"
          >
            <h3 className="font-medium">{category.title}</h3>
            <p className="text-sm text-gray-600">{category.items}</p>
          </div>
        ))}
      </div>

      {/* Right Column: Image Slider */}
      <div className="w-3/4 ml-4 overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          autoplay={{ delay: 5000 }}
          loop
          navigation
          pagination={{ clickable: true }}
          className="w-full h-[490px]"
        >
          {slideImages.map((src, index) => (
            <SwiperSlide key={index}>
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover border rounded-md border-gray-100 mt-2"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Hero;
